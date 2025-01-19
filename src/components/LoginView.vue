<template>
  <div class="login-wrapper" @click="showEffect" @mousemove="handleMouseMove" :style="backgroundStyle">
    <vue-particles
      id="particles-js"
      color="#ffffff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#ffffff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
    <div class="login-container">
      <div class="form-header">
        <h2>用户登录</h2>
        <p>欢迎回来，请登录您的账号</p>
      </div>
      <form @submit.prevent="handleLogin" class="floating-form">
        <div class="input-group">
          <input id="username" v-model.trim="username" type="text" autocomplete="off" @input="validateInput" required />
          <label for="username">用户名</label>
          <span class="highlight"></span>
        </div>
        <div class="input-group">
          <input id="password" v-model.trim="password" type="password" autocomplete="off" @input="validateInput" required />
          <label for="password">密码</label>
          <span class="highlight"></span>
        </div>
        <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
        <button type="submit" class="submit-btn" :disabled="!isFormValid">
          <span>登录</span>
          <i class="arrow-icon"></i>
        </button>
        <div class="form-footer">
          <span>账号为学号；密码为生日</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import VueParticles from 'vue-particles';
import axios from 'axios';

export default {
  components: {
    VueParticles
  },
  setup() {
    const config = ref({
      alignment: 0,
      alignmentfliph: false,
      alignmentposition: 50,
      alignmentx: 50,
      alignmenty: 50,
      alignmentz: 100,
      rate: 100,
      schemecolor: "0.118 0.157 0.255",
      volume: 0,
      wec_brs: 50,
      wec_con: 50,
      wec_e: false,
      wec_hue: 50,
      wec_sa: 50
    });

    const backgroundStyle = computed(() => {
      const { schemecolor } = config.value;
      const [r, g, b] = schemecolor.split(' ').map(Number);
      const hexColor = `#${Math.floor(r * 255).toString(16).padStart(2, '0')}${Math.floor(g * 255).toString(16).padStart(2, '0')}${Math.floor(b * 255).toString(16).padStart(2, '0')}`;
      return {
        backgroundColor: hexColor,
        backgroundPosition: `${config.value.alignmentx}% ${config.value.alignmenty}%`
      };
    });

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;
      document.querySelector('.login-wrapper').style.backgroundPosition = `${x}% ${y}%`;
    };

    onMounted(() => {
      document.addEventListener('mousemove', handleMouseMove);
    });

    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove);
    });

    const username = ref('');
    const password = ref('');
    const errorMsg = ref('');
    const isFormValid = ref(false);

    const validateInput = () => {
      if (username.value && password.value) {
        isFormValid.value = true;
        errorMsg.value = '';
      } else {
        isFormValid.value = false;
      }
    };

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8183/login', {
          username: username.value,
          password: password.value
        });
        if (response.data === '登录成功') {
          console.log('登录成功');
          // 登录成功后的处理，例如跳转页面等
        } else {
          errorMsg.value = response.data;
        }
      } catch (error) {
        errorMsg.value = '登录失败，请稍后再试';
        console.error('登录请求失败', error);
      }
    };

    const showEffect = (event) => {
      const a = [
        "用我三生烟火，换你一世迷离","长街长，烟花繁，你挑灯回看","短亭短，红尘辗，我把萧再叹","半壁见海日，空中闻天鸡","终是谁使弦断，花落肩头，恍惚迷离","多少红颜悴，多少相思碎，唯留血染墨香哭乱冢","苍茫大地一剑尽挽破，何处繁华笙歌落","斜倚云端千壶掩寂寞，纵使他人空笑我","任他凡事清浊，为你一笑间轮回甘堕","寄君一曲，不问曲终人聚散","谁将烟焚散，散了纵横的牵绊","听弦断，断那三千痴缠","坠花湮，湮没一朝风涟","花若怜，落在谁的指尖","灯火星星，人声杳杳，歌不尽乱世烽火","如花美眷，似水流年","回得了过去，回不了当初","似此星辰非昨夜，为谁风露立中宵","何年东君迟来久，细数银丝鬓上逢","山河拱手，为君一笑","待浮花浪蕊俱尽，伴君幽独"
      ];
      const idx = Math.floor(Math.random() * a.length);
      const text = a[idx];
      const x = event.pageX;
      const y = event.pageY;

      const $i = document.createElement('span');
      $i.textContent = text;
      $i.style.position = 'absolute';
      $i.style.left = `${x}px`;
      $i.style.top = `${y}px`;
      $i.style.zIndex = '999999999999999999999999999999999999999999999999999999999999999999999';
      $i.style.fontSize = '16px';
      $i.style.color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
      $i.style.transition = 'all 2s ease-out';
      $i.style.opacity = '1';
      $i.style.transform = 'translateY(0)';
      document.body.appendChild($i);

      setTimeout(() => {
        $i.style.opacity = '0';
        $i.style.transform = 'translateY(-50px)';
      }, 0);

      setTimeout(() => {
        $i.remove();
      }, 2000);
    };

    onMounted(() => {
      // 初始化粒子动画
    });

    return {
      username,
      password,
      errorMsg,
      isFormValid,
      validateInput,
      handleLogin,
      showEffect,
      backgroundStyle
    };
  }
};
</script>

<style scoped>
.login-wrapper {
  min-height: 93.5vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('D:\Program Files\MobileAppEngine\steam\steamapps\workshop\content\431960\1853032145\preview.jpg') no-repeat center center;
  background-size: cover;
  padding: 20px;
  position: relative;
  transition: background-position 5s ease; 
}

#particles-js {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.login-container {
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.792);
  border-radius: 20px;
  padding: 40px;
  padding-right: 80px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-header h2 {
  color: #2c3e50;
  font-size: 32px;
  margin-bottom: 10px;
  font-weight: 700;
}

.form-header p {
  color: #95a5a6;
  font-size: 16px;
}

.floating-form .input-group {
  position: relative;
  margin-bottom: 30px;
}

.input-group input {
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: transparent;
}

.input-group label {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  padding: 0 5px;
  color: #95a5a6;
  font-size: 16px;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-group input:focus,
.input-group input:valid {
  border-color: #3498db;
}

.input-group input:focus + label,
.input-group input:valid + label {
  top: 0;
  font-size: 14px;
  color: #3498db;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  margin-left: 15px;
  background: linear-gradient(to right, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.arrow-icon {
  border: solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  color: #95a5a6;
}

.form-footer a {
  color: #3498db;
  text-decoration: none;
  margin-left: 5px;
  font-weight: 600;
}

.form-footer a:hover {
  text-decoration: underline;
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;
}

@media (max-width: 480px) {
  .login-container {
    padding: 20px;
  }

  .form-header h2 {
    font-size: 24px;
  }

  .input-group input {
    padding: 12px;
  }
}

@media (max-width: 768px) {
  .login-container {
    max-width: 400px;
    padding: 30px;
  }

  .form-header h2 {
    font-size: 28px;
  }

  .form-header p {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 20px;
    margin: 10px;
    max-width: 100%;
  }

  .form-header h2 {
    font-size: 24px;
  }

  .form-header p {
    font-size: 14px;
  }

  .input-group input {
    padding: 12px;
    font-size: 14px;
  }

  .input-group label {
    font-size: 14px;
  }

  .submit-btn {
    padding: 12px;
    font-size: 16px;
  }
}

@media (max-width: 320px) {
  .login-container {
    padding: 15px;
  }

  .form-header h2 {
    font-size: 20px;
  }

  .input-group {
    margin-bottom: 20px;
  }
}
</style>