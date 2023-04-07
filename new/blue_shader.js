const now = () => Date.now()
class Clock {
	constructor() {
		this.startTime = 0;
		this.oldTime = 0;
		this.elapsedTime = 0;
	}
	start() {
		this.startTime = now();
		this.oldTime = this.startTime;
		this.elapsedTime = 0;
	}
	getElapsedTime() {
		this.getDelta();
		return this.elapsedTime;
	}
	getDelta() {
		let diff = 0;
		const newTime = now();
		diff = ( newTime - this.oldTime ) / 1000;
		this.oldTime = newTime;
		this.elapsedTime += diff;
		return diff;
	}
}
const clock = new Clock()
clock.start()
class Random {
  constructor() {
    this.useA = false;
    let sfc32 = function (uint128Hex) {
      let a = parseInt(uint128Hex.substr(0, 8), 16);
      let b = parseInt(uint128Hex.substr(8, 8), 16);
      let c = parseInt(uint128Hex.substr(16, 8), 16);
      let d = parseInt(uint128Hex.substr(24, 8), 16);
      return function () {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    this.prngA = new sfc32(tokenData.hash.substr(2, 32));
    this.prngB = new sfc32(tokenData.hash.substr(34, 32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
}
let R = new Random()

const fS0 = `// variation on a theme: https://www.shadertoy.com/view/Md2cDK
precision highp float;
uniform float time;
uniform vec2 res;

float spiralWave(vec2 p, float ratio, float rate, float scale, float dir) {

    float r = length(p);

    float theta = atan(p.x,p.y) * dir;

    float logspiral = log(r)/ratio + theta;

    return sin(rate*time + scale*logspiral);

}


void main()
{
	vec2 p = gl_FragCoord.xy / res;
	p = p - 1.0;
	p.x *= res.x / res.y;

  float goldenRatio = 0.618;
  float MayerWave = 0.0959;

  float gray = 0.5 + 0.5 * spiralWave(p,goldenRatio,MayerWave,5.,1.);
  gray += 0.5 + 0.5 * spiralWave(p,goldenRatio,MayerWave/pow(goldenRatio,5.),1.,-1.);
  vec3 color = vec3(.2*gray,.5*gray,.9*gray);
  //color *= .6+.4*sin(time*2.*3.1415*MayerWave);
 	//gl_FragColor  = vec4(color,.8+.2*sin(time*2.*3.1415*MayerWave));
  gl_FragColor  = vec4(color,1.);
}
`

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
  };

  material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: `void main() {gl_Position = vec4( position, 1.0 );}`,
      fragmentShader: fS0
  });


  mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({canvas: document.getElementById("blue_shader"), alpha: !0});
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

// window.addEventListener("resize", ()=>{
//   uniforms.res.value.x = document.body.clientWidth;
//   uniforms.res.value.y = document.body.clientHeight;
//
//   // uniforms.res.value.x = window.innerWidth;
//   // uniforms.res.value.y = window.innerHeight;
//
//   renderer.setSize(document.body.clientWidth, document.body.clientHeight);
//   ca
//   //renderer.setSize(window.innerWidth, window.innerHeight)
//   renderer.setPixelRatio(window.devicePixelRatio)
// })

var container = renderer.domElement.parentElement;
window.addEventListener('resize', onContainerResize);

function onContainerResize() {
    var box = container.getBoundingClientRect();
      uniforms.res.value.x = box.width;
      uniforms.res.value.y = box.height;
    renderer.setSize(box.width, box.height);

    camera.aspect = box.width/box.height
    camera.updateProjectionMatrix()
    // optional animate/renderloop call put here for render-on-changes
}
