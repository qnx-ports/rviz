OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Passes the vertex pick color 

uniform vec4 pick_color;

MAIN_PARAMETERS
MAIN_DECLARATION
{
  gl_FragColor = pick_color;
}
