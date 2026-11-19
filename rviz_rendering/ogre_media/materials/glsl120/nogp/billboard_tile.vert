OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Computes the position of a billboard vertex so
// the resulting quad will face a given direction given by up & normal.
// Texture coords are used to determine which corner
// of the billboard we compute.

uniform mat4 worldviewproj_matrix;
uniform vec4 size;
uniform vec4 normal;
uniform vec4 up;

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
  vec3 right = cross(up.xyz, normal.xyz);

  vec4 s = iuv * size;
  vec3 r = s.xxx * right;
  vec3 u = s.yyy * up.xyz;

  vec4 pos = ipos + vec4(r + u, 0.0);

  gl_Position = worldviewproj_matrix * pos;
  vUv = iuv + vec4(0.5, 0.5, 0.0, 0.0);
  vColor = icolor;

#ifdef WITH_DEPTH
  vDepth = passDepth(pos);
#endif
}
