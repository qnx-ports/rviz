// rasterizes a circle of radius 0.5
void circleImpl(vec4 color, float ax, float ay)
{
  float rsquared = ax * ax + ay * ay;
  float a = (0.25 - rsquared) * 4.0;

  if (a <= 0.0)
    discard;

  gl_FragColor = vec4(color.rgb, color.a * ceil(a));
}
