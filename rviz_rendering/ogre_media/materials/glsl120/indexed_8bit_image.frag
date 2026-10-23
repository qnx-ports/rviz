OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Draws an 8-bit image using RGB values from a 256x1 palette texture.

uniform sampler2D eight_bit_image;
uniform sampler2D palette;
uniform float alpha;

MAIN_PARAMETERS
IN(vec2 UV, 0)
MAIN_DECLARATION
{
  // The 0.999 multiply is needed because brightness value 255 comes
  // out of texture2D() as 1.0, which wraps around to 0.0 in the
  // palette texture.
  vec4 color = texture2D(palette, vec2(0.999 * texture2D(eight_bit_image, UV).x, 0.5));
  gl_FragColor = vec4(color.rgb, color.a * alpha);
}
