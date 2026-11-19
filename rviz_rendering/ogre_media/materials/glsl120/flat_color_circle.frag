OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "circle_impl.frag"

// Draws a circle in the fragment color, multiplying a with the alpha param

uniform vec4 highlight;
uniform float alpha;

MAIN_PARAMETERS
IN(vec4 vColor, 1)
IN(vec4 vUv, 2)
MAIN_DECLARATION
{
  vec3 col = vColor.xyz + vColor.xyz * highlight.xyz;
  circleImpl(vec4(col, alpha * vColor.a), vUv.x - 0.5, vUv.y - 0.5);
}
