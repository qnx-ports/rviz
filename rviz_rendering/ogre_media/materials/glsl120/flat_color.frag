OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Passes the fragment color, multiplying a with the alpha param

uniform vec4 highlight;
uniform float alpha;

MAIN_PARAMETERS
IN(vec4 vColor, 1)
MAIN_DECLARATION
{
  vec3 col = vColor.xyz + vColor.xyz * highlight.xyz;
  gl_FragColor = vec4(col, vColor.a * alpha);
}
