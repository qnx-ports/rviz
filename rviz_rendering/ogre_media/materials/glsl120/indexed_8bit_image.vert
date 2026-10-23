OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Draws an 8-bit image using RGB values from a 256x1 palette texture.
// This vertex shader just passes through the UV texture coordinates.
// I'm not sure if it is necessary or not.

uniform mat4 worldviewproj_matrix;

MAIN_PARAMETERS
IN(vec4 pos, POSITION)
IN(vec2 uv0, TEXCOORD0)
OUT(vec2 UV, 0)
MAIN_DECLARATION
{
  gl_Position = worldviewproj_matrix * pos;
  UV = vec2(uv0);
}
