import React, { Component } from 'react'
import WaveSurfer from 'wavesurfer.js'
import Data from './Data.json'
import './stylesheets/audioWave.css'
class AudioWave extends Component {  
  constructor() {
    super()
    this.track=React.createRef()
    this.state = {
      playing: false,
      songs: Data,
      song:'',
      songActive: '',
      name:'',
      isDisable: true,
      background: ''
    }
  }

  handleWave = (source, background, name) => {
    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 80,
      progressColor: 'orangered',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    })
    this.waveform.load(source);
    this.waveform.on('ready', () => {
      this.setState({
        songActive: source,
        isDisable: false,
        song: source,
        background,
        name
      })
    })
  }

  componentDidMount() {
    this.handleWave('media/audio/melodyloops-preview-arabian-night.mp3', 'media/images/arabian-night.jpeg', 'melodyloops-preview-arabian-night')
  }
  
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.waveform.playPause()
    this.waveform.on('audioprocess', () => {
      (this.waveform.isPlaying()?this.setState({ playing: true }):this.setState({ playing: false }))
    })
  }

  handleSong = (event) => {
    if('media/audio/'+event.target.dataset.source===this.state.song) {
      this.setState({ playing: !this.state.playing });
      this.waveform.playPause()
    } else {
      this.waveform.destroy()
      this.setState({
        playing: false,
        isDisable: true
      })
      this.handleWave('media/audio/'+event.target.dataset.source, event.target.dataset.background, event.target.dataset.name)
    }
  }

  handleIncrease = () => {
    let currentVolume=this.waveform.getVolume();
    if(currentVolume<1){
      this.waveform.setVolume(currentVolume+=.1)
    }
  }

  handleDecrease = () => {
    let currentVolume=this.waveform.getVolume();
    if(currentVolume>.1){
      this.waveform.setVolume(currentVolume-=.1)
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className='waveformContianer'>
          <div className='overlay'></div>
          <img className='background' src={this.state.background} alt='' />
          <p className=''>
            {this.state.playing&&<img className='wait' src='media/images/wait.gif' alt='' />}
            {this.state.name}
          </p>
          <div className='volume'>
            <span onClick={this.handleDecrease}>-</span>
            <span onClick={this.handleIncrease}>+</span>
          </div>
          <button 
            className='playButton'
            disabled={this.state.isDisable} 
            onClick={this.handlePlay} 
          >
            {this.state.playing ? 'Play' : 'Pause'}
          </button>
          <div className='wave' id="waveform"></div>
        </div>
        
          <div className='songs'>
          {Data.map(song => 
            <div 
              key={song.id}
              onClick={this.handleSong} 
              data-source={song.source}
              data-background={song.background}
              data-name={song.name>35?song.name.substr(0,35)+'...':song.name}
              className={this.state.songActive===('media/audio/'+song.source) ? 'song active' : 'song'}>
              {song.name>25?song.name.substr(0,25)+'...':song.name}
            </div>
          )}
          </div>
      </div>
    )
  }
}

export default AudioWave