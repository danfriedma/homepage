const fS = `
precision highp float;
uniform float time;
uniform vec2 res;
uniform float paletteColor;
uniform float n;
uniform vec3 colors[55];
uniform float b;
uniform float c;
uniform float d;
uniform float edge_sharpness;
uniform float zoom;
uniform float wave;
uniform float numOfReflections;
uniform float pos;
uniform float Equanimity;
uniform float Tranquility;
uniform float LFPeak;
uniform float opc0;
uniform float opc1;
uniform float opc2;

const float PI = 3.1415926535897932384626433832795;
const float MayerWave = 0.0959;

vec3 pick_color( float t ) {float p = n * t;return mix(colors[int(floor(p))], colors[int(ceil(p))], fract(p));}
vec3 rbow( float t ) {return .2*cos(6.283*(t+vec3(-.15,-.4833,.18333)))+.7;}
float invlerp(in float a, in float b, in float t){return (t-a) / (b-a);}
vec4 add_spiral (vec4 O, float l, float v ) {return mix(vec4(.9,.5,.6,opc0), O, smoothstep(0.,20.*l, fract(v) / fwidth(v)*.05 ));}
float fifth = 6.283/5.;

void main()
{
	vec2 p = gl_FragCoord.xy / res;
	p = p - 1.0;
	p.x *= res.x / res.y;
	vec2 q = p;
	p = p/zoom;

	float t = time*(2.*PI);
	float len = length(p);
	float lg = log(len)/(4.*log(1.618));
	float a = -atan(p.x,p.y);
	float v0 = lg - a/6.283;
	float v1 = lg + a/6.283;

	vec4 O = vec4(.3,.8,.8,opc1);
	O = add_spiral(O, len, v0 + t*MayerWave*.1);
	O = add_spiral(O, len, v1 + t*MayerWave*.1);

	p += p * sin(dot(p, p)*wave-t*MayerWave) * .04;
	gl_FragColor = vec4(pick_color(paletteColor),1.);
	gl_FragColor = mix(gl_FragColor, O, opc2);
	float loops = floor(numOfReflections);
	for (float i = .5 ; i < 8. ; i++) {
			if (i >= loops){break;}
			p =  2.*abs(p-floor(p+.5)) * mat2(cos(.01*(t*.1+pos*Tranquility)*i*i + .78*vec4(1,6.+invlerp(.6,2.,Equanimity)*(1.6),3,1))),
			//p = 2.*abs(p-floor(p+.5)) * mat2(cos(.01*(t*.1+pos)*i*i + .78*gl_FragColor)),
			//gl_FragColor += sin(.2+.8*cos(t*LFPeak)*exp(-abs(p.y)*edge_sharpness)) * (cos(vec4(2,3,1,0)*i)*.5+.5);
			gl_FragColor += sin(c*t*MayerWave*exp(-abs(p.y)*edge_sharpness)) * (cos(vec4(2,3,1,0)*i)*.5+.5);
			//gl_FragColor += exp(-abs(p.y)*edge_sharpness) * (cos(vec4(2,3,1,0)*i)*.5+.5);
	}

	float l = length(q);
	float m = l;
	float drbow = m - d;
	l = smoothstep(l*.5,l*.95,.5+(sin(t*MayerWave)/4.));
	m = smoothstep(m*.1,m*.85,.5+(sin(t*MayerWave)/4.))-smoothstep(m*.85,m*1.,.5+(sin(t*MayerWave)/4.));
	float db = smoothstep(drbow*.1,drbow*.55,.5+(sin(t*MayerWave)/4.))-smoothstep(drbow*.55,drbow*1.,.5+(sin(t*MayerWave)/4.));
	gl_FragColor.rgb = mix(gl_FragColor.rgb, pick_color(mod(paletteColor+d,1.)), l*b);
	gl_FragColor.rgb = mix(gl_FragColor.rgb, rbow(l), m*(.5 + invlerp(.6,2.,Equanimity)*.5));
	//gl_FragColor.rgb = mix(gl_FragColor.rgb, rbow(db), m);
}`


const palette = '6e1423-85182a-a11d33-a71e34-b21e35-bd1f36-ff7b00-ff8800-ff9500-ffa200-ffaa00-ffb700-ffc300-ffd000-ffdd00-ffea00-ffe169-fad643-edc531-dbb42c-c9a227-b69121-a47e1b-926c15-805b10-76520e-8cedb0-76e5aa-60dda4-49d59f-32cd9e-2bbb99-1fa28d-169384-0c7e78-026969-80ffdb-72efdd-64dfdf-56cfe1-48bfe3-4ea8de-5390d9-5e60ce-6930c3-7400b8-571089-6411ad-6d23b6-822faf-973aa8-ac46a1-c05299-d55d92-ea698b'
function h2r(hex) {
  var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const p = (i) => (parseInt(r[i], 16)/255).toFixed(10)
  return new THREE.Color(p(1),p(2),p(3))
}

var camera, scene, renderer
var uniforms, material, mesh
var mouseX = 0, mouseY = 0,
    lat = 0, lon = 0, phy = 0, theta = 0
var windowHalfX = window.innerWidth / 2
var windowHalfY = window.innerHeight / 2
init()
animate()
function init() {
  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  uniforms = {
      time: { type: "f", value: 1.0 },
      res: { type: "v2", value: new THREE.Vector2() },
      paletteColor: { type: "f", value: R.random_dec() },
      n: { type: "f", value: 55 },
      colors: { type: "u_array", value: palette.split('-').map(h2r)  },
      b: { type: "f", value: R.random_dec() },
      c: { type: "f", value: R.random_dec() },
      d: { type: "f", value: R.random_dec() },
      edge_sharpness: { type: "f", value: 5. + R.random_dec()*15. },
      zoom: { type: "f", value: 1.8 },
      wave: { type: "f", value: 50. * R.random_dec() },
      numOfReflections: { type: "f", value: 4. + R.random_dec()*4. },
      pos: { type: "f", value: R.random_dec()*800 },
      Equanimity: { type: "f", value: 1.0 },
      Tranquility: { type: "f", value: 1.0 },
      LFPeak: { type: "f", value: .0959 },
      opc0: { type: "f", value: R.random_dec() },
      opc1: { type: "f", value: R.random_dec() },
      opc2: { type: "f", value: R.random_dec() },
  };

  material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `void main() {gl_Position = vec4( position, 1.0 );}`,
      fragmentShader: fS
  });


  mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({canvas: document.getElementById("chrysanthemum"), alpha: !0});
  renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

  uniforms.res.value.x = window.innerWidth;
  uniforms.res.value.y = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  uniforms.time.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}

window.addEventListener("resize", ()=>{
  uniforms.res.value.x = window.innerWidth;
  uniforms.res.value.y = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
})
