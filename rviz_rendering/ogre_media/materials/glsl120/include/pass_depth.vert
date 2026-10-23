uniform mat4 worldview_matrix;

float passDepth(vec4 pos)
{
  vec4 pos_rel_view = worldview_matrix * pos;
  return -pos_rel_view.z;
}
