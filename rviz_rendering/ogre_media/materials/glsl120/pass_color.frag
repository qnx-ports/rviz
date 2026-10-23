OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Passes the fragment color unchanged 

MAIN_PARAMETERS
IN(vec4 color, COLOR)
MAIN_DECLARATION
{
  gl_FragColor = color;
}
