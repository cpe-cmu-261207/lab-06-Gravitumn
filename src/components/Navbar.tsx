import {Link } from 'react-router-dom'


const Navbar = () => {
	return (
		<div className='my-5'>
			<p className='text-center text-3xl italic my-5'>Minimal Bitcoin App</p>
			<div className='flex justify-center text-md space-x-5'>
				<Link to='/'>Current price</Link>	
				<p>|</p>
				<Link to='/history/select'>Historical price</Link>	
				<p>|</p>
				<Link to='/about'>About me</Link>	
			</div>
		</div>
	)
}

export default Navbar