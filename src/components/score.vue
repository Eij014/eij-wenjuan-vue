<template>
  <div class="rate">
    <span v-if="showText" class="text">{{curScore||score}}分</span>
    <div class="star-wrap">
      <i
        v-for="(i, index) in 5"
        :key="index"
        @mouseenter="disabled ? '' : curScore=i"
        @mouseleave="disabled ? '' : curScore=''"
        @click="disabled ? '' : setScore(i)"
        :class="getClass(i)"
      >
      </i>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Score',
    props: {
      // 分数，默认0，保留一位小数
      score: {
        type: Number,
        default: 0
      },
      // 是否只读，默认false，鼠标点击可以打分
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示分数，默认false
      showText: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        curScore: '',//星星的数量
      }
    },
    methods: {
      getClass (i) {
        if (this.curScore === '') {
          return i <= this.score ? 'icon-star' : 'icon-star-o'
        } else {
          return i <= this.curScore ? 'icon-star' : 'icon-star-o'
        }
      },
      setScore (i) {//如果为true的话 执行setScore 对score 进行双向绑定
        this.$emit('update:score', i)//使用`.sync`修饰符，对score 进行双向绑定
      }
    }
  }
</script>
<style>
  .rate .text {
    font-size: 18px;
    color: #ff7f2c;
    font-weight: bold;
  }
  .rate .star-wrap {
    line-height: 0;
  }
  .rate .star-wrap .icon-star-o {
    position: relative;
    width: 18px;
    height: 18px;
    line-height: 0;
    display: inline-block;
    margin-right: 2px;
    background: url('../assets/icon/noScore.png') 0 0 / auto 100%;
  }
  .rate .star-wrap .icon-star-o .icon-star {
    position: absolute;
    left: 0;
    top: 0;
  }
  .rate .star-wrap .icon-star {
    width: 18px;
    height: 18px;
    line-height: 0;
    display: inline-block;
    margin-right: 2px;
    background: url('../assets/icon/score.png') 0 0 / auto 100%;
  }
  .rate .star-wrap i:last-child {
    margin-right: 0px;
  }

</style>
