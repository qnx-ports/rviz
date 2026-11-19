OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// Computes the position of a billboard vertex so
// the resulting quad will face the camera.
// Texture coords are used to determine which corner
// of the billboard we compute.

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
  vec3 at = camera_pos.xyz - ipos.xyz;
  at = normalize(at);
  vec3 right = cross(vec3(0.0, 1.0, 0.0), at);
  vec3 up = cross(at, right);
  right = normalize(right);
  up = normalize(up);

  // if auto_size == 1, then size_factor == size*gl_Vertex.z
  // if auto_size == 0, then size_factor == size
  vec4 size_factor = (1.0 - auto_size.x + (auto_size.x * ipos.z)) * size;

  vec4 s = iuv * size_factor;
  vec3 r = s.xxx * right;
  vec3 u = s.yyy * up;
  
  vec4 pos = ipos + vec4(r + u, 0.0);
  
  gl_Position = worldviewproj_matrix * pos;
  vUv = iuv + vec4(0.5, 0.5, 0.0, 0.0);
  vColor = icolor;

#ifdef WITH_DEPTH
  vDepth = passDepth(pos);
#endif
}
