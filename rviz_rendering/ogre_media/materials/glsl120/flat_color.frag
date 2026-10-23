OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Passes the fragment color, multiplying a with the alpha param

uniform vec4 highlight;
uniform float alpha;

MAIN_PARAMETERS
IN(vec4 color, COLOR)
MAIN_DECLARATION
{
  vec3 col = color.xyz + color.xyz * highlight.xyz;
  gl_FragColor = vec4(col, color.a * alpha);
}
