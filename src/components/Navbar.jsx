import React from 'react';

const Navbar = () => {
    return (
        <nav
          className={`${
            styles.paddingX
          } w-full flex items-center py-5 fixed top-0 z-20 my-bg-primary`}
        >
          <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
            <Link
              to='/'
              className='flex items-center gap-2'
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              {/* <img src={Charity_Chain_logo} alt='logo' className='w-12 h-12 object-contain paddingX' /> */}
              
              <p className='text-white text-[24px] font-bold cursor-pointer flex p-3'>
                CharityChain | Be The Link
              </p>
            </Link>
              <ul className='list-none hidden sm:flex flex-row gap-10 justify-start items-center '>
                {navLinks.map((nav) => (
                  <li
                  key={nav.id}
                  className={`${
                    active === nav.title ? "text-lg" : "text-white"
                  } text-[18px] font-medium cursor-pointer`}
                  onClick={() => handleNavLinkClick(nav.id, nav.title)}
                >
                  <span>{nav.title}</span>
                  </li>
                ))}
                <li>
                <Popup trigger={<button className="bg-transparent text-white text-[18px] font-medium rounded-full"> Share </button>} modal
              contentStyle={{borderRadius: '15px', width: 'auto', height: 'auto', display: 'flex', flexDirection: 'column', padding: '0 60px'}}>
              {close => (
                  <div className="p-4 bg-white  flex flex-col items-center">
                  <h2 className="text-2xl font-black mb-6 text-darkest-green">Share</h2>
                  <img src={qr}height={250} width={250}></img>
               
                  <button className=" mt-10 text-dark-olive py-1 px-2 rounded-full self-end border" 
                  onClick={() =>{
                    close();
                  }}>
                    Close
                    </button>
                  </div>
              )}
              </Popup>
                </li>
    
              {!currentUser && (<li>
              <Popup trigger={<button className="bg-transparent text-white text-[18px] font-medium rounded-full"> Join Us! </button>} modal
              contentStyle={{borderRadius: '15px'}}>
              {close => (
                  <div className="p-4 bg-white  flex flex-col">
                  <h2 className="text-2xl font-black mb-6 text-darkest-green">Login</h2>
                  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                  <form className="flex flex-col justify-between flex-grow">
                      <div className="mb-6">
                      <label className="block text-my-olive text-sm font-bold mb-2" htmlFor="email-address">
                          Email address
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-light-teal leading-tight focus:outline-none focus:shadow-outline" id="email-address"
                                          name="email"
                                          type="email"
                                          style={{backgroundColor: '#FFFFFF'}}                                 
                                          required                                                                                
                                          placeholder="Email address"
                                          onFocus={(e)=>e.target.placeholder = ""}
                                          onBlur={(e)=>e.target.placeholder = "Email address"}
                                          onChange={(e)=>setEmail(e.target.value)}/>
                      </div>
                      <div className="mb-6">
                      <label className="block text-my-olive text-sm font-bold mb-2" htmlFor="password">
                          Password
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-light-teal leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" required
                                          style={{backgroundColor: '#FFFFFF'}}
                                          onFocus={(e)=>e.target.placeholder = ""}
                                          onBlur={(e)=>e.target.placeholder = "Password"}                                                                                 
                                          onChange={(e)=>setPassword(e.target.value)} />
                      </div>
                      <div className="mb-6 flex items-center justify-between">
                      <button className="text-dark-olive font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline border" type="button" onClick={isCreateAccountMode ? onCreateAccount : onLogin}>
              {isCreateAccountMode ? 'Create Account' : 'Sign In'}
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-dark-olive" href="#" onClick={toggleMode}>
              {isCreateAccountMode ? 'Already have an account? Sign In' : 'Create Account'}
            </a>
                      </div>
                      </form>
                  <button className="mt-4 text-dark-olive py-1 px-2 rounded-full self-end border" 
                  onClick={() =>{
                    setError('');
                    close();
                  }}>
                    Close
                    </button>
                  </div>
              )}
              </Popup>
                </li>)}
    
                {currentUser && (<li
                  className={`${
                    active === Account ? "text-lg" : "text-white"
                  } cursor-pointer`}>
                    <button className="bg-transparent text-white text-[18px] font-medium rounded-full" onClick={handleSignOut}> Sign Out </button>
                  
                </li>)}
    
              </ul>
              
    
            <div className='sm:hidden flex flex-1 justify-end items-center'>
              <img
                src={toggle ? close : menu}
                alt='menu'
                className="w-[28px] h-[28px] object-contain cursor-pointer justify-end"
                onClick={() => setToggle(!toggle)}
              />
    
              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 my-bg-primary absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-xl`}
              >
                <ul className='list-none flex justify-start items-start flex-1 flex-col gap-4'>
                  {navLinks.map((nav) => (
                    <li
                      key={nav.id}
                      className={`font-poppins font-medium cursor-pointer text-[16px] ${
                        active === nav.title ? "text-lg" : "text-white"
                      }`}
                      onClick={() => {
                        setToggle(!toggle);
                        setActive(nav.title);
                      }}
                    >
                      <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      );
};

export default Navbar;
