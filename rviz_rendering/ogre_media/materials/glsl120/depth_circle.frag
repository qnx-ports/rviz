OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "pack_depth.frag"
#include "circle_impl.frag"

MAIN_PARAMETERS
IN(float depth, 0)
IN(vec2 uv0, 1)
MAIN_DECLARATION
{
  circleImpl(packDepth(depth), uv0.x - 0.5, uv0.y - 0.5);
}
