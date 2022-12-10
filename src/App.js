import React from 'react'
import axios from 'axios'
import './App.css'
import moon from './assets/moon.png'
import search from './assets/search.png'
import company from './assets/company.svg'
import location from './assets/location.svg'
import twitter from './assets/twitter.svg'
import website from './assets/website.svg'


class GithubUserSearch extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
  username: '',
  userData: null,
  error:null,
  mode: 'light'
  }
}

handleChange = (event) => {
  this.setState({username: event.target.value});
}

searchUser = (event) => {
  event.preventDefault();
  axios.get(`https://api.github.com/users/${this.state.username}`)
  .then((response) => {
  this.setState({userData: response.data});
  this.setState({error:null})
  })
  .catch(() => {
    this.setState({error: "no result"});
});
}

toggleMode = () => {
  this.setState({ mode: this.state.mode === 'light' ? 'dark' : 'light' });
}

render(){
  return(
    <div className={`app ${this.state.mode === 'light' ? 'light-mode' : 'dark-mode'}`}>
    <header className='flex justify-between pt-8 mb-9 sm:bg-black mt-35'>
      <p className='text-2xl text-infinity-700'>devfinder</p>
      <div className='flex items-center'>
          <p className='mr-4 text-sm text-san-marino-700 '>dark</p>
          <img src={moon} alt='moon icon' onClick={this.toggleMode}/>
      </div>
    </header>
    <main>
      <form className='relative' onSubmit={this.searchUser}>
        <img src={search} alt='search-icon'className='absolute top-5 left-4 left-8'/>
        <input value={this.state.username} onChange={this.handleChange} className='w-full h-15 rounded-2xl border-none outline-none bg-white-as-heaven indent-11 text-san-marino-400 text-sm caret-blue-sparkle text-lg indent-20' placeholder='Search GitHub username…' />
       <span className='absolute top-5 left-25 text-tart-orange-700'>{this.state.error}</span>
        <button type='submit' className='absolute top-3 right-4 py-3 px-4 border-none rounded-xl bg-blue-sparkle text-white-700'>Search</button>
      </form>
      {this.state.userData &&(
      <section className='mt-4 pt-8 pb-12 px-6 bg-white-as-heaven rounded-2xl px-10 py-10'>
        <div className='flex flex-wrap'>
          <img className='w-17 mr-4 mr-10 w-28' src={this.state.userData.avatar_url} alt='github logo'/>
          <div>
            <p className='text-anchors-aweigh-700 text-base mb-1 text-2xl'>{this.state.userData.name}</p>
            <p className='text-blue-sparkle-400 text-sm mb-1 text-base'>{this.state.userData.login}</p>
            <p className='text-searching-blue-400 text-sm text-xs'>{this.state.userData.created_at}</p>
          </div>
          <p className='mt-8 text-san-marino-400'>{this.state.userData.bio?this.state.userData.bio:"This profile has no bio"}</p>
        </div>
        <div className='flex justify-between px-3 py-5 mt-6 bg-ghost-white rounded-xl'>
          <div>
            <p className='text-san-marino-400 text-xs'>Repos</p>
            <p className='text-center text-anchors-aweigh-700 mt-2 text-base'>{this.state.userData.public_repos}</p>
          </div>
          <div>
            <p className='text-san-marino-400 text-xs'>Followers</p>
            <p className='text-center text-anchors-aweigh-700 mt-2 text-base'>{this.state.userData.followers}</p>
          </div>
          <div>
            <p className='text-san-marino-400 text-xs'>Following</p>
            <p className='text-center text-anchors-aweigh-700 mt-2 text-base'>{this.state.userData.following}</p>
          </div>
        </div>
        <div className='flex flex-col mt-6 flex-row'>
          <div className='mr-15'>
            <div className='flex mb-4'>
              <img className='mr-4' src={location} alt='location icon'/>
              <p className='text-sm text-san-marino-400'>{this.state.userData.location?this.state.userData.location:"not avilable"}</p>
            </div>
            <div className='flex mb-4'>
              <img className='mr-4' src={website} alt='location icon'/>
              <p className='text-sm text-san-marino-400'>{this.state.userData.blog?this.state.userData.blog:"not avilable"}</p>
            </div>
          </div>
          <div>
            <div className='flex mb-4'>
              <img className='mr-4' src={twitter} alt='location icon'/>
              <p className='text-sm text-san-marino-400 opacity-80'>{this.state.userData.twitter_username?this.state.userData.twitter_username:"not avilable"}</p>
            </div>
            <div className='flex'>
              <img className='mr-4' src={company} alt='location icon'/>
              <p className='text-sm text-san-marino-400'>{this.state.userData.company?this.state.userData.company:"not avilable"}</p>
            </div>
          </div>
        </div>
      </section>
      )}
    </main>
  </div>
  )
}}

 export default GithubUserSearch;