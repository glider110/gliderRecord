//map::find
#include <iostream>
#include <map>

int main ()
{
    std::map<char,int> mymap;
    std::map<char,int>::iterator it;

    mymap['a']=50;
    mymap['b']=100;
    mymap['c']=150;
    mymap['d']=200;

    it = mymap.find('d');
    if (it != mymap.end())
{
 std::cout << "a => "  << '\n';
        mymap.erase (it);
}
    // print content:
    //std::cout << "elements in mymap:" <<*it<< '\n';
    std::cout << "a => " << mymap.find('a')->second << '\n';
    std::cout << "c => " << mymap.find('c')->second << '\n';
    std::cout << "d => " << mymap.find('d')->second << '\n';
    std::cout << "b => " << mymap.find('b')->second << '\n';
    std::cout << "e => " << mymap.find('e')->second << '\n';

    return 0;
}

