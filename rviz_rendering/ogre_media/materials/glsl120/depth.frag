OGRE_NATIVE_GLSL_VERSION_DIRECTIVE
#include "OgreUnifiedShader.h"

#include "pack_depth.frag"

// Passes on the packed depth value

MAIN_PARAMETERS
IN(float depth, 0)
MAIN_DECLARATION
{
  gl_FragColor = packDepth(depth);
}
