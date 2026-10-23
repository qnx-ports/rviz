OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "circle_impl.frag"

// Draws a circle in the fragment color

MAIN_PARAMETERS
IN(vec4 color, COLOR)
IN(vec2 uv0, TEXCOORD0)
MAIN_DECLARATION
{
  circleImpl(color, uv0.x - 0.5, uv0.y - 0.5);
}
