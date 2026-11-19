OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// rasterizes a smooth square with ax,ay in [-0.5..0.5]

uniform vec4 highlight;
uniform float alpha;

MAIN_PARAMETERS
IN(vec4 vColor, 1)
IN(vec4 vUv, 2)
MAIN_DECLARATION
{
  float ax = vUv.x - 0.5;
  float ay = vUv.y - 0.5;

  float blend = smoothstep(-0.48, -0.45, ay) * (1.0 - smoothstep(0.45, 0.48, ay)) *
                smoothstep(-0.48, -0.45, ax) * (1.0 - smoothstep(0.45, 0.48, ax));

  float inv_blend = 1.0 - blend;
  vec3 col = blend * vColor.xyz + (sign(0.5 - length(vec3(vColor.xyz))) * vec3(0.2, 0.2, 0.2) + vColor.xyz) * inv_blend;

  //alternative version: make color at edge darker
  //vec3 col = (0.5 + 0.5*blend) * gl_Color.xyz;

  col = col + col * highlight.xyz;

  gl_FragColor = vec4(col.r, col.g, col.b, alpha * vColor.a);
}
