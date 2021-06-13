<template>
  <header class="home pt-14">
    <!-- 輪播 -->
    <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="5000">
          <img src="../../assets/img/carousel1.jpg" class="d-block w-100" alt="img_oil">
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="../../assets/img/carousel2.jpg" class="d-block w-100" alt="img_dark">
        </div>
        <div class="carousel-item" data-bs-interval="5000">
          <img src="../../assets/img/carousel3.jpeg" class="d-block w-100" alt="img_color">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <!-- 最新消息 -->
    <main class="container">
      <div class="news my-md-16 my-10">
        <h2 class="home-title fw-bolder text-center position-relative mb-12">最新消息</h2>
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12 mb-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
            <div class="card mews-card">
              <img src="../../assets/img/banner3.jpg" class="card-img-top" alt="...">
              <div class="card-body mx-5" style="height: 155px">
                <h5 class="card-title fw-bolder">在家安心購物，宅配免費</h5>
                <p class="card-text">防疫有你有我！宅在家也能安心購物</p>
                <p class="my-5"><small class="text-lgreen">發佈日期 | 2021-05-26</small></p>
              </div>
              <div class="card-footer mx-5">
                <a href="#" class="btn btn-hgray hvr-bounce-to-right">了解更多</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-12 mb-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <div class="card mews-card">
              <img src="../../assets/img/banner3.jpg" class="card-img-top" alt="...">
              <div class="card-body mx-5" style="height: 155px">
                <h5 class="card-title fw-bolder">粉絲真心告白認證</h5>
                <p class="card-text">粉絲大聲說 ....， 肌膚真的改善了</p>
                <p class="my-5"><small class="text-lgreen">發佈日期 | 2021-05-26</small></p>
              </div>
              <div class="card-footer mx-5">
                <a href="#" class="btn btn-hgray hvr-bounce-to-right">了解更多</a>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-12" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="700">
            <div class="card mews-card">
              <img src="../../assets/img/banner3.jpg" class="card-img-top" alt="...">
              <div class="card-body mx-5" style="height: 155px">
                <h5 class="card-title fw-bolder">限量品 - 好評回歸上市</h5>
                <p class="card-text">[ 香氛沐浴乳 ] 全台百貨櫃位、官方購物限量販售!</p>
                <p class="my-5"><small class="text-lgreen">發佈日期 | 2021-05-26</small></p>
              </div>
              <div class="card-footer mx-5">
                <a href="#" class="btn btn-hgray hvr-bounce-to-right">了解更多</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- video -->
    <div class="video-banner position-relative my-md-16 my-10 w-100">
      <div class="container h-100">
        <div class="row align-items-center h-100 w-100 ms-0">
          <div class="col-12 col-md-10 col-lg-8 col-xl-7 order-2 order-md-1">
            <strong class="video-title h1 fw-bolder text-white mx-10 mx-md-0">德國施巴 pH5.5 原創領導品牌</strong>
          </div>
          <div class="col-12 col-md-2 col-lg-4 col-xl-5 order-1 order-md-2 d-flex flex-column align-items-center">
            <a href="https://www.sebamed.com.tw/video/sebamed.mp4" class="video-btn hvr-buzz-out zindex-1" target="_blank">
              <i class="fas fa-play zindex-1"></i>
            </a>
            <p class="video-text text-sgreen mt-10 position-relative zindex-1">潔膚皂的誕生</p>
          </div>
        </div>
      </div>
    </div>
    <!-- about -->
    <div class="bg-sgray py-15 mb-md-16 mb-10">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-5 mb-md-0">
            <div class="about-text bg-white p-5 px-xl-9 py-xl-11 d-flex flex-column align-items-center">
              <h2 class="about-title fw-bolder mb-10 text-center">
                <span>Science for healthy skin<br>美麗來自健康肌膚</span>
              </h2>
              <p class="h5 text-center">
                我們相信美麗來自健康肌膚 !<br>
                堅持醫學皮膚護理的觀念，<br>
                研發 pH5.5 的潔護膚產品，<br>
                使用 Sebamed 超有安心感。
              </p>
            </div>
          </div>
          <div class="col-md-3 mb-5 mb-md-0">
            <img class="about-img-top" data-aos="fade-down" src="../../assets/img/about_img.jpg" alt="about_img">
          </div>
          <div class="col-md-3">
            <img class="about-img-bottom w-100" data-aos="fade-up" src="../../assets/img/about_img1.jpg" alt="about_img">
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  data () {
    return {
    }
  },
  methods: {
    animateNone () {
      const jsAnimate = document.querySelector('.js-animate-carousel')
      const jsAnimate2 = document.querySelector('.js-animate-carousel-2')
      setTimeout(() => {
        jsAnimate.classList.remove('animate__slideInLeft')
        jsAnimate2.classList.remove('animate__slideInRight')
      }, 2000)
    }
  },
  mounted () {
    this.animateNone()
    AOS.init({
      offset: 120,
      duration: 400
    })
  }
}
</script>
