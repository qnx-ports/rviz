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
IN(vec4 ipos, POSITION)
IN(vec4 icolor, COLOR)
IN(vec4 iuv, TEXCOORD0)
#ifdef WITH_DEPTH
OUT(float vDepth, 0)
#endif
OUT(vec4 vColor, 1)
OUT(vec4 vUv, 2)
MAIN_DECLARATION
{
  gl_Position = worldviewproj_matrix * ipos;
  gl_PointSize = size.x;
  vColor = icolor;
  vUv = iuv;

#ifdef WITH_DEPTH
  vDepth = passDepth(ipos);
#endif
}
