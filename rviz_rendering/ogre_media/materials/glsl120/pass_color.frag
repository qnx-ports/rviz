OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Passes the fragment color unchanged 

MAIN_PARAMETERS
IN(vec4 vColor, 1)
MAIN_DECLARATION
{
  gl_FragColor = vColor;
}
