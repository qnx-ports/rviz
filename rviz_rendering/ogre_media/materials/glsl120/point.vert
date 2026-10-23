OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#ifdef WITH_DEPTH
#include "pass_depth.vert"
#endif

// Generic vertex shader for point sprites
// sets position and point size.
// Works for perspective and orthographic projection.

uniform mat4 worldviewproj_matrix;
uniform vec4 size;

MAIN_PARAMETERS
IN(vec4 pos, POSITION)
IN(vec4 icolor, COLOR)
IN(vec2 iuv, TEXCOORD0)
#ifdef WITH_DEPTH
OUT(float depth, 0)
#endif
OUT(vec4 ocolor, 1)
OUT(vec2 ouv, 2)
MAIN_DECLARATION
{
  gl_Position = worldviewproj_matrix * pos;
  gl_PointSize = size.x;
  ocolor = icolor;
  ouv = iuv;

#ifdef WITH_DEPTH
  depth = passDepth(pos);
#endif
}
