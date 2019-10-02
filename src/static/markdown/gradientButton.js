export const gradientMarkdown = `
## Additional props

In addition to regular \`View\` props, you can also provide additional props to customize your gradient look:

#### colors

An array of at least two color values that represent gradient colors. Example: \`['red', 'blue']\` sets gradient from red to blue.

#### start

An optional object of the following type: \`{ x: number, y: number }\`. Coordinates declare the position that the gradient starts at, as a fraction of the overall size of the gradient, starting from the top left corner. Example: \`{ x: 0.1, y: 0.1 }\` means that the gradient will start 10% from the top and 10% from the left.

#### end

Same as start, but for the end of the gradient.

#### locations

An optional array of numbers defining the location of each gradient color stop, mapping to the color with the same index in \`colors\` prop. Example: \`[0.1, 0.75, 1]\` means that first color will take 0% - 10%, second color will take 10% - 75% and finally third color will occupy 75% - 100%.

#### useAngle / angle / angleCenter

You may want to achieve an angled gradient effect, similar to those in image editors like Photoshop.  
One issue is that you have to calculate the angle based on the view's size, which only happens asynchronously and will cause unwanted flickr.

In order to do that correctly you can set \`{ useAngle: true, angle: 45, angleCenter: { x: 0.5, y: 0.5} }\`, to achieve a gradient with a 45 degrees angle, with its center positioned in the view's exact center.

\`useAngle\` is used to turn on/off angle based calculation (as opposed to \`start\`/\`end\`).  
\`angle\` is the angle in degrees.  
\`angleCenter\` is the center point of the angle (will control the weight and stretch of the gradient like it does in photoshop.
`;
