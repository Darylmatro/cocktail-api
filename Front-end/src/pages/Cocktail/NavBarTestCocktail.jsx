function NavBarTestCocktail() {

    return (
        <div>
            <nav className='bg-sky-700 p-2 my-2 text-center w-auto'> 
                <ul className='flex justify-around'>
                    <li className='m-4'><a href="/cocktail/list"><p className='text-white'>Liste des cocktails</p></a></li>
                    <li className='m-4'><a href="/cocktail/new"><p className='text-white'>Ajouter un cocktail</p></a></li>
                    <li className='m-4'><a href="/cocktail/search"><p className='text-white'>Rechercher un cocktail</p></a></li>
                    <li className='m-4'><a href="/cocktail/detail"><p className='text-white'>Information sur le cocktail</p></a></li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBarTestCocktail;