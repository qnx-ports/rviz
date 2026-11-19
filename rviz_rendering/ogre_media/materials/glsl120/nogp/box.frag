OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

// rasterizes a smooth square on any face of a box
// and creates a fake lighting effect
// x,y,z texture coords must be in the interval (-0.5...0.5)

uniform vec4 highlight;
uniform float alpha;

const float lightness[6] = float[] (
    0.9, 0.5, 0.6, 0.6, 1.0, 0.4 );

MAIN_PARAMETERS
IN(vec4 vColor, 1)
IN(vec4 vUv, 2)
MAIN_DECLARATION
{
  float ax;
  float ay;
  float l;
  
  if (vUv.z > 0.4999)
  {
    ax = vUv.x;
    ay = vUv.y;
    l = lightness[0];
  }
  else if (vUv.z < -0.4999)
  {
    ax = vUv.x;
    ay = vUv.y;
    l = lightness[1];
  }
  else if (vUv.x > 0.4999)
  {
    ax = vUv.y;
    ay = vUv.z;
    l = lightness[2];
  }
  else if (vUv.x < -0.4999)
  {
    ax = vUv.y;
    ay = vUv.z;
    l = lightness[3];
  }
  else if (vUv.y > 0.4999)
  {
    ax = vUv.x;
    ay = vUv.z;
    l = lightness[4];
  }
  else
  {
    ax = vUv.x;
    ay = vUv.z;
    l = lightness[5];
  }

  float blend = smoothstep(-0.48, -0.45, ay) * (1.0 - smoothstep(0.45, 0.48, ay)) *
                smoothstep(-0.48, -0.45, ax) * (1.0 - smoothstep(0.45, 0.48, ax));
  
  float inv_blend = 1.0 - blend;
  
  //vec3 col = blend * vColor.xyz + (sign(0.5 - length(vec3(vColor.xyz))) * vec3(0.2, 0.2, 0.2) + vColor.xyz) * inv_blend;
  
  //alternative version: make color at edge darker
  vec3 col = (0.5 + 0.5 * blend) * vColor.xyz;
  
  col = col * l;
  
  col = col + col * highlight.xyz;

  gl_FragColor = vec4(col.r, col.g, col.b, alpha * vColor.a);
}
