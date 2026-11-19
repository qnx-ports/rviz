OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "pack_depth.frag"
#include "circle_impl.frag"

// Draws a circle with the packed depth value

MAIN_PARAMETERS
IN(float vDepth, 0)
IN(vec4 vUv, 2)
MAIN_DECLARATION
{
  circleImpl(packDepth(vDepth), vUv.x - 0.5, vUv.y - 0.5);
}
