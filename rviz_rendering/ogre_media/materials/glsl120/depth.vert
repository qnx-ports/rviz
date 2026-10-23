OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "pass_depth.vert"

// Minimal depth passthrough shader

uniform mat4 worldviewproj_matrix;

MAIN_PARAMETERS
IN(vec4 pos, POSITION)
OUT(float depth, 0)
MAIN_DECLARATION
{
    gl_Position = worldviewproj_matrix * pos;
    depth = passDepth(pos);
}
