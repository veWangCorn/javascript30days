const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const sliders = player.querySelectorAll('.player__slider')
const skipButtons = player.querySelectorAll('[data-skip]')

//播放和暂停
function togglePlay(){
    const method = video.paused ? 'play' : 'pause'
    video[method]() //video.play() or video.pause()
}

//图标的切换
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚'  //video.paused
    toggle.innerHTML = icon   //toggle.textContent
}

// 快进和快退
function skip(){
    video.currentTime += parseInt(this.dataset.skip)  //通过修改当前时间完成快进和快退，字符串转换为数字
}

//音量播放和速度
function handleRangeUpdate(){
    video[this.name] = this.value
}
//进度条
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%` //改变flex-basis 的百分比值就可以调节它所占父元素的宽度
}

//根据点击位置设置播放时间
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration //e.offsetX相对容器的水平坐标,offsetWidth元素宽
    video.currentTime = scrubTime
}

//控制视频播放
video.addEventListener('click',togglePlay)
toggle.addEventListener('click',togglePlay)

//控制图标变化
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)

//控制快进、快退
skipButtons.forEach(button => {
    button.addEventListener('click',skip)
});

//音量播放和速度
sliders.forEach(slider=>{
    slider.addEventListener('change',handleRangeUpdate)
})
sliders.forEach(slider => {
    slider.addEventListener('mousemove', handleRangeUpdate)
})

//自动更新进度条进度
video.addEventListener('timeupdate', handleProgress) //timeupdate这个事件会在媒体文件的 currentTime 属性改变的时触发

//点击进度条播放进度
progress.addEventListener('click',scrub)
//拖动进度条
let mousedown = false

//鼠标在progress上移动
progress.addEventListener('mousemove',(e)=>{
    //若处于拖拽状态更新
    if(mousedown){
        scrub(e)
    }
    // mousedown && scrub(e)
})
// 鼠标按下改变标志
progress.addEventListener('mousedown',()=>mousedown = true)

//鼠标抬起
progress.addEventListener('mouseup',()=>mousedown = false)