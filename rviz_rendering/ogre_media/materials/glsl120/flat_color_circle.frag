OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "circle_impl.frag"

// Draws a circle in the fragment color, multiplying a with the alpha param

uniform vec4 highlight;
uniform float alpha;

MAIN_PARAMETERS
IN(vec4 color, COLOR)
IN(vec2 uv0, TEXCOORD0)
MAIN_DECLARATION
{
  vec3 col = color.xyz + color.xyz * highlight.xyz;
  circleImpl(vec4(col, alpha * color.a), uv0.x - 0.5, uv0.y - 0.5);
}
