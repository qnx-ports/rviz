OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// rasterizes a circle that is darker at the borders than in the center

uniform vec4 highlight;
uniform float alpha;

MAIN_PARAMETERS
IN(vec4 vColor, 1)
IN(vec4 vUv, 2)
MAIN_DECLARATION
{
  float ax = vUv.x - 0.5;
  float ay = vUv.y - 0.5;

  float rsquared = ax * ax + ay * ay;
  float a = (0.25 - rsquared) * 4.0;

  vec3 col = mix(vec3(0.8, 0.8, 0.8) * vColor.xyz, vColor.xyz, a);

  col = col + col * highlight.xyz;
  
  gl_FragColor = vec4(col, alpha * ceil(a) * vColor.a);
}
