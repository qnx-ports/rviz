OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Basic mvp vertex transform

uniform mat4 worldviewproj_matrix;

MAIN_PARAMETERS
IN(vec4 pos, POSITION)
MAIN_DECLARATION
{
  gl_Position = worldviewproj_matrix * pos;
}
