OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// rasterizes a smooth square with ax,ay in [-0.5..0.5]

uniform vec4 highlight;
uniform float alpha;

MAIN_PARAMETERS
IN(vec4 color, COLOR)
IN(vec2 uv0, TEXCOORD0)
MAIN_DECLARATION
{
  float ax = uv0.x - 0.5;
  float ay = uv0.y - 0.5;

  float blend = smoothstep(-0.48, -0.45, ay) * (1.0 - smoothstep(0.45, 0.48, ay)) *
                smoothstep(-0.48, -0.45, ax) * (1.0 - smoothstep(0.45, 0.48, ax));

  float inv_blend = 1.0 - blend;
  vec3 col = blend * color.xyz + (sign(0.5 - length(vec3(color.xyz))) * vec3(0.2, 0.2, 0.2) + color.xyz) * inv_blend;

  //alternative version: make color at edge darker
  //vec3 col = (0.5 + 0.5*blend) * gl_Color.xyz;

  col = col + col * highlight.xyz;

  gl_FragColor = vec4(col.r, col.g, col.b, alpha * color.a );
}
