/*
 * Copyright (c) 2011, Willow Garage, Inc.
 * Copyright (c) 2017, Open Source Robotics Foundation, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Willow Garage, Inc. nor the names of its
 *       contributors may be used to endorse or promote products derived from
 *       this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef RVIZ_RENDERING__RENDER_SYSTEM_HPP_
#define RVIZ_RENDERING__RENDER_SYSTEM_HPP_


#include <cstdint>
#include <string>

#include <OgreRoot.h>
#include <Overlay/OgreOverlaySystem.h>  // NOLINT cpplint cannot handle include order here
#if defined(__QNX__)
#include <RenderSystems/GLES2/OgreGLES2Plugin.h>  // NOLINT cpplint cannot handle include order here
#else
#include <RenderSystems/GL/OgreGLPlugin.h>  // NOLINT cpplint cannot handle include order here
#endif

#include <QDir>  // NOLINT cpplint cannot handle include order here

#if defined(__linux__)

#include <X11/Xutil.h>
#include <GL/glx.h>

#elif defined(__QNX__)

#include <RTShaderSystem/OgreRTShaderSystem.h>  // NOLINT cpplint cannot handle include order here
#include <OgreMaterialManager.h>  // NOLINT cpplint cannot handle include order here
#include <map>  // NOLINT cpplint cannot handle include order here
#include <mutex>  // NOLINT cpplint cannot handle include order here

#endif

#include "rviz_rendering/visibility_control.hpp"
#include "rviz_rendering/ogre_logging.hpp"

namespace rviz_rendering
{

#if defined(__QNX__)

class RVIZ_RENDERING_PUBLIC SGTechniqueResolverListener
  : public Ogre::MaterialManager::Listener
{
public:
  explicit SGTechniqueResolverListener(
    Ogre::RTShader::ShaderGenerator* pShaderGenerator);

  Ogre::Technique * handleSchemeNotFound(
    unsigned short scheme_index,  // NOLINT: Ogre decides the use of unsigned short
    const Ogre::String & scheme_name,
    Ogre::Material * original_material,
    unsigned short lod_index,  // NOLINT: Ogre decides the use of unsigned short
    const Ogre::Renderable * rend) override;

  bool afterIlluminationPassesCreated(Ogre::Technique* tech) override;
  bool beforeIlluminationPassesCleared(Ogre::Technique* tech) override;

protected:
  Ogre::RTShader::ShaderGenerator* shaderGenerator_;
};

#endif

class RVIZ_RENDERING_PUBLIC RenderSystem
{
public:
#if !defined(__QNX__)
#if defined(__APPLE__) || defined(_WIN32)
  typedef size_t WindowIDType;
#else
  typedef unsigned long WindowIDType;  // NOLINT: we need to use C longs here
#endif
#endif

  static
  RenderSystem *
  get();

#if defined(__QNX__)
  Ogre::RenderWindow *
  makeRenderWindow(
    void * display,
    void * surface,
    unsigned int width,
    unsigned int height,
    double pixel_ratio = 1.0);

  void addSGSceneManager(Ogre::SceneManager* sceneMgr);
  void removeSGSceneManager(Ogre::SceneManager* sceneMgr);

#else
  Ogre::RenderWindow *
  makeRenderWindow(
    WindowIDType window_id,
    unsigned int width,
    unsigned int height,
    double pixel_ratio = 1.0);

#endif
  Ogre::Root *
  getOgreRoot();

  ~RenderSystem();

  void Destroy();

  // Prepare a scene_manager to render overlays.
  // Needed for Ogre >= 1.9 to use fonts; does nothing for prior versions.
  void
  prepareOverlays(Ogre::SceneManager * scene_manager);

  /// return OpenGl Version as integer, e.g. 320 for OpenGl 3.20
  int
  getGlVersion();

  /// return GLSL Version as integer, e.g. 150 for GLSL 1.50
  int
  getGlslVersion();

  /// Disables the use of Anti Aliasing
  static
  void
  disableAntiAliasing();

  /// Force to use the provided OpenGL version on startup
  static
  void
  forceGlVersion(int version);

  /// Disable stereo rendering even if supported in HW.
  static
  void
  forceNoStereo();

  /// True if we can render stereo on this device.
  bool
  isStereoSupported();

private:
  RenderSystem();

  void
  loadOgrePlugins();

  // helper for makeRenderWindow()
  Ogre::RenderWindow *
  tryMakeRenderWindow(
    const std::string & name,
    unsigned int width,
    unsigned int height,
    const Ogre::NameValuePairList * params,
    int max_attempts);

  // Find and configure the render system.
  void
  setupRenderSystem();
  void
  setResourceDirectory();
  void
  setPluginDirectory();
  void
  setupResources();
  void
  addAdditionalResourcesFromAmentIndex() const;
  void
  detectGlVersion();

  static RenderSystem * instance_;

  Ogre::Root * ogre_root_;
  Ogre::OverlaySystem * ogre_overlay_system_;

  int gl_version_;
  int glsl_version_;
  static bool use_anti_aliasing_;
  static int force_gl_version_;
  bool stereo_supported_;
  static bool force_no_stereo_;
  rviz_rendering::OgreLogging * ogre_logging;
#if defined(__QNX__)
  Ogre::RTShader::ShaderGenerator* shaderGenerator_;
  SGTechniqueResolverListener* materialMgrListener_;
  std::map< Ogre::SceneManager*, unsigned > sgscene_ref_count_;
  std::mutex sgscene_lock_;

  bool initialiseRTShaderSystem();
#endif
};

}  // namespace rviz_rendering

#endif  // RVIZ_RENDERING__RENDER_SYSTEM_HPP_
