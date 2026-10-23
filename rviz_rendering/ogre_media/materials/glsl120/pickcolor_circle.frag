OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "circle_impl.frag"

// Draws a circle in the pick color

uniform vec4 pick_color;

MAIN_PARAMETERS
IN(vec2 uv0, 2)
MAIN_DECLARATION
{
  circleImpl(pick_color, uv0.x - 0.5, uv0.y - 0.5);
}
