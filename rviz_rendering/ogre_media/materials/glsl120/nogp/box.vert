OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Computes the position of a box vertex from its texture coords.
// Used in case that geometry shaders are not supported.

uniform mat4 worldviewproj_matrix;
uniform vec4 camera_pos;
uniform vec4 size;
uniform vec4 auto_size;

#ifdef WITH_DEPTH
#include "pass_depth.vert"
#endif

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
  // if auto_size == 1, then size_factor == size*gl_Vertex.z
  // if auto_size == 0, then size_factor == size
  vec4 size_factor = (1.0 - auto_size.x + (auto_size.x * ipos.z)) * size;

  vec4 s = iuv * size_factor;
  vec4 pos = ipos - s;
  gl_Position = worldviewproj_matrix * pos;
  vUv = iuv;
  vColor = icolor;

#ifdef WITH_DEPTH
  vDepth = passDepth(pos);
#endif
}
