OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "circle_impl.frag"

// Draws a circle in the pick color

uniform vec4 pick_color;

MAIN_PARAMETERS
IN(vec4 vUv, 2)
MAIN_DECLARATION
{
  circleImpl(pick_color, vUv.x - 0.5, vUv.y - 0.5);
}
