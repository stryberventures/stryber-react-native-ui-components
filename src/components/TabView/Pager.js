import React from 'react';
import {TextInput, Keyboard, I18nManager} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import PropTypes from 'prop-types';

import {tabView} from '../../constants';
import {memoize} from '../../utils';
import styles from './styles';

const {
  TRUE,
  FALSE,
  NOOP,
  UNSET,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  SWIPE_DISTANCE_MINIMUM,
  SPRING_CONFIG,
  TIMING_CONFIG,
} = tabView;

const {
  Clock,
  Value,
  onChange,
  and,
  abs,
  add,
  block,
  call,
  ceil,
  clockRunning,
  cond,
  divide,
  eq,
  event,
  floor,
  greaterThan,
  lessThan,
  max,
  min,
  multiply,
  neq,
  not,
  round,
  set,
  spring,
  startClock,
  stopClock,
  sub,
  timing,
} = Animated;

export default class Pager extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      navigationState,
      layout,
      swipeVelocityImpact,
      springVelocityScale,
      springConfig,
      timingConfig,
    } = this.props;
    const {index, routes} = navigationState;

    if (
      // Check for index in state to avoid unintended transition if component updates during swipe
      (index !== prevProps.navigationState.index &&
        index !== this.currentIndexValue) ||
      // Check if the user updated the index correctly after an update
      (typeof this.pendingIndexValue === 'number' &&
        index !== this.pendingIndexValue)
    ) {
      // Index in user's state is different from the index being tracked
      this.jumpToIndex(index);
    }

    // Reset the pending index
    this.pendingIndexValue = undefined;

    // Update our mappings of animated nodes when props change
    if (prevProps.navigationState.routes.length !== routes.length) {
      this.routesLength.setValue(routes.length);
    }

    if (prevProps.layout.width !== layout.width) {
      this.progress.setValue(-index * layout.width);
      this.layoutWidth.setValue(layout.width);
    }

    if (prevProps.swipeVelocityImpact !== swipeVelocityImpact) {
      this.swipeVelocityImpact.setValue(
        swipeVelocityImpact !== undefined && swipeVelocityImpact,
      );
    }

    if (prevProps.springVelocityScale !== springVelocityScale) {
      this.springVelocityScale.setValue(
        springVelocityScale !== undefined && springVelocityScale,
      );
    }

    if (prevProps.springConfig !== springConfig) {
      this.springConfig.damping.setValue(
        springConfig.damping !== undefined
          ? springConfig.damping
          : SPRING_CONFIG.damping,
      );

      this.springConfig.mass.setValue(
        springConfig.mass !== undefined
          ? springConfig.mass
          : SPRING_CONFIG.mass,
      );

      this.springConfig.stiffness.setValue(
        springConfig.stiffness !== undefined
          ? springConfig.stiffness
          : SPRING_CONFIG.stiffness,
      );

      this.springConfig.restSpeedThreshold.setValue(
        springConfig.restSpeedThreshold !== undefined
          ? springConfig.restSpeedThreshold
          : SPRING_CONFIG.restSpeedThreshold,
      );

      this.springConfig.restDisplacementThreshold.setValue(
        springConfig.restDisplacementThreshold !== undefined
          ? springConfig.restDisplacementThreshold
          : SPRING_CONFIG.restDisplacementThreshold,
      );
    }

    if (prevProps.timingConfig !== timingConfig) {
      this.timingConfig.duration.setValue(
        timingConfig.duration !== undefined
          ? timingConfig.duration
          : TIMING_CONFIG.duration,
      );
    }
  }

  // Clock used for tab transition animations
  clock = new Clock();

  // Current state of the gesture
  velocityX = new Value(0);
  gestureX = new Value(0);
  gestureState = new Value(State.UNDETERMINED);
  offsetX = new Value(0);

  // Current progress of the page (translateX value)
  progress = new Value(
    // Initial value is based on the index and page width
    this.props.navigationState.index *
      this.props.layout.width *
      DIRECTION_RIGHT,
  );

  // Initial index of the tabs
  index = new Value(this.props.navigationState.index);

  // Next index of the tabs, updated for navigation from outside (tab press, state update)
  nextIndex = new Value(UNSET);

  // Scene that was last entered
  lastEnteredIndex = new Value(this.props.navigationState.index);

  // Whether the user is currently dragging the screen
  isSwiping = new Value(FALSE);

  // Whether the update was due to swipe gesture
  // This controls whether the transition will use a spring or timing animation
  // Remember to set it before transition needs to occur
  isSwipeGesture = new Value(FALSE);

  // Track the index value when a swipe gesture has ended
  // This lets us know if a gesture end triggered a tab switch or not
  indexAtSwipeEnd = new Value(this.props.navigationState.index);

  // Mappings to some prop values
  // We use them in animation calculations, so we need live animated nodes
  routesLength = new Value(this.props.navigationState.routes.length);
  layoutWidth = new Value(this.props.layout.width);

  // Determines how relevant is a velocity while calculating next position while swiping
  swipeVelocityImpact = new Value(
    this.props.swipeVelocityImpact !== undefined &&
      this.props.swipeVelocityImpact,
  );

  springVelocityScale = new Value(
    this.props.springVelocityScale !== undefined &&
      this.props.springVelocityScale,
  );

  // The position value represent the position of the pager on a scale of 0 - routes.length-1
  // It is calculated based on the translate value and layout width
  // If we don't have the layout yet, we should return the current index
  position = cond(
    this.layoutWidth,
    divide(multiply(this.progress, -1), this.layoutWidth),
    this.index,
  );

  // Animation configuration
  springConfig = {
    damping: new Value(
      this.props.springConfig.damping !== undefined
        ? this.props.springConfig.damping
        : SPRING_CONFIG.damping,
    ),
    mass: new Value(
      this.props.springConfig.mass !== undefined
        ? this.props.springConfig.mass
        : SPRING_CONFIG.mass,
    ),
    stiffness: new Value(
      this.props.springConfig.stiffness !== undefined
        ? this.props.springConfig.stiffness
        : SPRING_CONFIG.stiffness,
    ),
    restSpeedThreshold: new Value(
      this.props.springConfig.restSpeedThreshold !== undefined
        ? this.props.springConfig.restSpeedThreshold
        : SPRING_CONFIG.restSpeedThreshold,
    ),
    restDisplacementThreshold: new Value(
      this.props.springConfig.restDisplacementThreshold !== undefined
        ? this.props.springConfig.restDisplacementThreshold
        : SPRING_CONFIG.restDisplacementThreshold,
    ),
  };

  timingConfig = {
    duration: new Value(
      this.props.timingConfig.duration !== undefined
        ? this.props.timingConfig.duration
        : TIMING_CONFIG.duration,
    ),
  };

  // The reason for using this value instead of simply passing `this._velocity`
  // into a spring animation is that we need to reverse it if we're using RTL mode.
  // Also, it's not possible to pass multiplied value there, because
  // value passed to STATE of spring (the first argument) has to be Animated.Value
  // and it's not allowed to pass other nodes there. The result of multiplying is not an
  // Animated.Value. So this value is being updated on each start of spring animation.
  initialVelocityForSpring = new Value(0);

  // The current index change caused by the pager's animation
  // The pager is used as a controlled component
  // We need to keep track of the index to determine when to trigger animation
  // The state will change at various points, we should only respond when we are out of sync
  // This will ensure smoother animation and avoid weird glitches
  currentIndexValue = this.props.navigationState.index;

  // The pending index value as result of state update caused by swipe gesture
  // We need to set it when state changes from inside this component
  // It also needs to be reset right after componentDidUpdate fires
  pendingIndexValue = undefined;

  // Numeric id of the previously focused text input
  // When a gesture didn't change the tab, we can restore the focused input with this
  previouslyFocusedTextInput = null;

  // Listeners for the entered screen
  enterListeners = [];

  jumpToIndex = index => {
    // If the index changed, we need to trigger a tab switch
    this.isSwipeGesture.setValue(FALSE);
    this.nextIndex.setValue(index);
  };

  jumpTo = key => {
    const {navigationState, keyboardDismissMode, onIndexChange} = this.props;

    const index = navigationState.routes.findIndex(route => route.key === key);

    // A tab switch might occur when we're in the middle of a transition
    // In that case, the index might be same as before
    // So we conditionally make the pager to update the position
    if (navigationState.index === index) {
      this.jumpToIndex(index);
    } else {
      onIndexChange(index);

      if (keyboardDismissMode === 'auto') {
        Keyboard.dismiss();
      }
    }
  };

  addListener = (type, listener) => {
    if (type === 'enter') {
      this.enterListeners.push(listener);
    }
  };

  removeListener = (type, listener) => {
    if (type === 'enter') {
      const index = this.enterListeners.indexOf(listener);

      if (index > -1) {
        this.enterListeners.splice(index, 1);
      }
    }
  };

  handleEnteredIndexChange = ([value]) => {
    const index = Math.max(
      0,
      Math.min(value, this.props.navigationState.routes.length - 1),
    );

    this.enterListeners.forEach(listener => listener(index));
  };

  transitionTo = index => {
    const toValue = new Value(0);
    const frameTime = new Value(0);

    const state = {
      position: this.progress,
      time: new Value(0),
      finished: new Value(FALSE),
    };

    return block([
      cond(clockRunning(this.clock), NOOP, [
        // Animation wasn't running before
        // Set the initial values and start the clock
        set(toValue, multiply(index, this.layoutWidth, DIRECTION_RIGHT)),
        set(frameTime, 0),
        set(state.time, 0),
        set(state.finished, FALSE),
        set(this.index, index),
      ]),
      cond(
        this.isSwipeGesture,
        // Animate the values with a spring for swipe
        [
          cond(
            not(clockRunning(this.clock)),
            I18nManager.isRTL
              ? set(
                  this.initialVelocityForSpring,
                  multiply(-1, this.velocityX, this.springVelocityScale),
                )
              : set(
                  this.initialVelocityForSpring,
                  multiply(this.velocityX, this.springVelocityScale),
                ),
          ),
          spring(
            this.clock,
            {...state, velocity: this.initialVelocityForSpring},
            {...SPRING_CONFIG, ...this.springConfig, toValue},
          ),
        ],
        // Otherwise use a timing animation for faster switching
        timing(
          this.clock,
          {...state, frameTime},
          {...TIMING_CONFIG, ...this.timingConfig, toValue},
        ),
      ),
      cond(not(clockRunning(this.clock)), startClock(this.clock)),
      cond(state.finished, [
        // Reset values
        set(this.isSwipeGesture, FALSE),
        set(this.gestureX, 0),
        set(this.velocityX, 0),
        // When the animation finishes, stop the clock
        stopClock(this.clock),
      ]),
    ]);
  };

  handleGestureEvent = event([
    {
      nativeEvent: {
        translationX: this.gestureX,
        velocityX: this.velocityX,
        state: this.gestureState,
      },
    },
  ]);

  extrapolatedPosition = add(
    this.gestureX,
    multiply(this.velocityX, this.swipeVelocityImpact),
  );

  translateX = block([
    onChange(
      this.index,
      call([this.index], ([value]) => {
        this.currentIndexValue = value;

        // Without this check, the pager can go to an infinite update <-> animate loop for sync updates
        if (value !== this.props.navigationState.index) {
          // If the index changed, and previous animation has finished, update state
          this.props.onIndexChange(value);

          this.pendingIndexValue = value;

          // Force componentDidUpdate to fire, whether user does a setState or not
          // This allows us to detect when the user drops the update and revert back
          // It's necessary to make sure that the state stays in sync
          this.forceUpdate();
        }
      }),
    ),
    onChange(
      this.position,
      // Listen to updates in the position to detect when we enter a screen
      // This is useful for things such as lazy loading when index change will fire too late
      cond(
        I18nManager.isRTL
          ? lessThan(this.gestureX, 0)
          : greaterThan(this.gestureX, 0),
        // Based on the direction of the gesture, determine if we're entering the previous or next screen
        cond(neq(floor(this.position), this.lastEnteredIndex), [
          set(this.lastEnteredIndex, floor(this.position)),
          call([floor(this.position)], this.handleEnteredIndexChange),
        ]),
        cond(neq(ceil(this.position), this.lastEnteredIndex), [
          set(this.lastEnteredIndex, ceil(this.position)),
          call([ceil(this.position)], this.handleEnteredIndexChange),
        ]),
      ),
    ),
    onChange(
      this.isSwiping,
      // Listen to updates for this value only when it changes
      // Without `onChange`, this will fire even if the value didn't change
      // We don't want to call the listeners if the value didn't change
      call(
        [this.isSwiping, this.indexAtSwipeEnd, this.index],
        ([isSwiping, indexAtSwipeEnd, currentIndex]) => {
          const {keyboardDismissMode, onSwipeStart, onSwipeEnd} = this.props;

          if (isSwiping === TRUE) {
            onSwipeStart && onSwipeStart();

            if (keyboardDismissMode === 'auto') {
              const input = TextInput.State.currentlyFocusedField();

              // When a gesture begins, blur the currently focused input
              TextInput.State.blurTextInput(input);

              // Store the id of this input so we can refocus it if gesture was cancelled
              this.previouslyFocusedTextInput = input;
            } else if (keyboardDismissMode === 'on-drag') {
              Keyboard.dismiss();
            }
          } else {
            onSwipeEnd && onSwipeEnd();

            if (keyboardDismissMode === 'auto') {
              if (indexAtSwipeEnd === currentIndex) {
                // The index didn't change, we should restore the focus of text input
                const input = this.previouslyFocusedTextInput;

                if (input) {
                  TextInput.State.focusTextInput(input);
                }
              }

              this.previouslyFocusedTextInput = null;
            }
          }
        },
      ),
    ),
    onChange(
      this.nextIndex,
      cond(neq(this.nextIndex, UNSET), [
        // Stop any running animations
        cond(clockRunning(this.clock), stopClock(this.clock)),
        set(this.gestureX, 0),
        // Update the index to trigger the transition
        set(this.index, this.nextIndex),
        set(this.nextIndex, UNSET),
      ]),
    ),
    cond(
      eq(this.gestureState, State.ACTIVE),
      [
        cond(this.isSwiping, NOOP, [
          // We weren't dragging before, set it to true
          set(this.isSwiping, TRUE),
          set(this.isSwipeGesture, TRUE),
          // Also update the drag offset to the last progress
          set(this.offsetX, this.progress),
        ]),
        // Update progress with previous offset + gesture distance
        set(
          this.progress,
          I18nManager.isRTL
            ? sub(this.offsetX, this.gestureX)
            : add(this.offsetX, this.gestureX),
        ),
        // Stop animations while we're dragging
        stopClock(this.clock),
      ],
      [
        set(this.isSwiping, FALSE),
        set(this.indexAtSwipeEnd, this.index),
        this.transitionTo(
          cond(
            and(
              // We should consider velocity and gesture distance only when a swipe ends
              // The gestureX value will be non-zero when swipe has happened
              // We check against a minimum distance instead of 0 because `activeOffsetX` doesn't seem to be respected on Android
              // For other factors such as state update, the velocity and gesture distance don't matter
              greaterThan(abs(this.gestureX), SWIPE_DISTANCE_MINIMUM),
              greaterThan(
                abs(this.extrapolatedPosition),
                divide(this.layoutWidth, 2),
              ),
            ),
            // For swipe gesture, to calculate the index, determine direction and add to index
            // When the user swipes towards the left, we transition to the next tab
            // When the user swipes towards the right, we transition to the previous tab
            round(
              min(
                max(
                  0,
                  sub(
                    this.index,
                    cond(
                      greaterThan(this.extrapolatedPosition, 0),
                      I18nManager.isRTL ? DIRECTION_RIGHT : DIRECTION_LEFT,
                      I18nManager.isRTL ? DIRECTION_LEFT : DIRECTION_RIGHT,
                    ),
                  ),
                ),
                sub(this.routesLength, 1),
              ),
            ),
            // Index didn't change/changed due to state update
            this.index,
          ),
        ),
      ],
    ),
    this.progress,
  ]);

  getTranslateX = memoize((layoutWidth, routesLength, translateX) =>
    multiply(
      // Make sure that the translation doesn't exceed the bounds to prevent overscrolling
      min(
        max(
          multiply(layoutWidth, sub(routesLength, 1), DIRECTION_RIGHT),
          translateX,
        ),
        0,
      ),
      I18nManager.isRTL ? -1 : 1,
    ),
  );

  render() {
    const {
      layout,
      navigationState,
      swipeEnabled,
      children,
      removeClippedSubviews,
      gestureHandlerProps,
    } = this.props;

    const translateX = this.getTranslateX(
      this.layoutWidth,
      this.routesLength,
      this.translateX,
    );

    return children({
      position: this.position,
      addListener: this.addListener,
      removeListener: this.removeListener,
      jumpTo: this.jumpTo,
      // eslint-disable-next-line no-shadow
      render: children => (
        <PanGestureHandler
          enabled={layout.width !== 0 && swipeEnabled}
          onGestureEvent={this.handleGestureEvent}
          onHandlerStateChange={this.handleGestureEvent}
          activeOffsetX={[-SWIPE_DISTANCE_MINIMUM, SWIPE_DISTANCE_MINIMUM]}
          failOffsetY={[-SWIPE_DISTANCE_MINIMUM, SWIPE_DISTANCE_MINIMUM]}
          {...gestureHandlerProps}>
          <Animated.View
            removeClippedSubviews={removeClippedSubviews}
            style={[
              styles.container,
              layout.width
                ? {
                    width: layout.width * navigationState.routes.length,
                    transform: [{translateX}],
                  }
                : null,
            ]}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      ),
    });
  }
}

Pager.defaultProps = {
  swipeVelocityImpact: 0.2,
  springVelocityScale: 1,
};

Pager.propTypes = {
  layout: PropTypes.shape({width: PropTypes.number}),
  navigationState: PropTypes.shape({
    routes: PropTypes.array,
    index: PropTypes.number,
  }).isRequired,
  swipeEnabled: PropTypes.bool,
  children: PropTypes.func,
  removeClippedSubviews: PropTypes.bool,
  gestureHandlerProps: PropTypes.shape({}),
  swipeVelocityImpact: PropTypes.number,
  springVelocityScale: PropTypes.number,
  springConfig: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
    mass: PropTypes.number,
    overshootClamping: PropTypes.bool,
    restDisplacementThreshold: PropTypes.number,
    restSpeedThreshold: PropTypes.number,
  }),
  timingConfig: PropTypes.shape({duration: PropTypes.number}),
  keyboardDismissMode: PropTypes.string,
  onIndexChange: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeEnd: PropTypes.func,
};