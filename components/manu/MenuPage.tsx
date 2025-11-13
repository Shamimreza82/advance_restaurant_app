import React, { useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Utensils, GlassWater, Plus } from 'lucide-react'; 
import { Button } from "@/components/ui/button"; 

// --- Type Definitions ---
interface IMenuItem {
  id: number;
  name: string;
  description: string;
  price: string; 
  tags?: string[];
}

interface IMenuCategory {
  category: string;
  title: string;
  items: IMenuItem[];
}

// --- Mock Menu Data ---
const mockMenuData: IMenuCategory[] = [
  {
    category: 'appetizers',
    title: 'Appetizers',
    items: [
      { id: 1, name: 'Truffle Arancini', description: 'Crispy risotto balls filled with smoked mozzarella and black truffle oil.', price: '14.50', tags: ['V'] },
      { id: 2, name: 'Seared Scallops', description: 'Pan-seared Atlantic scallops with smoked paprika butter and microgreens.', price: '21.00', tags: ['GF'] },
      { id: 3, name: 'Steak Tartare', description: 'Hand-cut filet mignon, capers, shallots, Dijon, and quail egg yolk.', price: '18.00' },
    ],
  },
  {
    category: 'main_course',
    title: 'Main Course',
    items: [
      { id: 4, name: 'Filet Mignon', description: '8oz prime beef tenderloin served with potato gratin and asparagus.', price: '45.00', tags: ['GF'] },
      { id: 5, name: 'Pan-Seared Duck Breast', description: 'Maple-glazed duck breast, wild rice pilaf, and cherry reduction sauce.', price: '38.00' },
      { id: 6, name: 'Vegetable Wellington', description: 'Seasonal root vegetables baked in puff pastry with herbed ricotta.', price: '29.00', tags: ['V'] },
    ],
  },
  {
    category: 'desserts',
    title: 'Desserts',
    items: [
      { id: 7, name: 'Chocolate Lava Cake', description: 'Warm dark chocolate cake with a molten center, served with vanilla bean ice cream.', price: '12.00' },
      { id: 8, name: 'Crème Brûlée', description: 'Classic French custard with a crisp caramelized sugar topping.', price: '11.00', tags: ['GF'] },
    ],
  },
  {
    category: 'beverages',
    title: 'Beverages',
    items: [
      { id: 9, name: 'Espresso Martini', description: 'Vodka, coffee liqueur, freshly brewed espresso, and simple syrup.', price: '16.00' },
      { id: 10, name: 'House Red Wine', description: 'Pinot Noir, Burgundy, France (by the glass).', price: '14.00' },
      { id: 11, name: 'Artisan Sparkling Water', description: 'Locally sourced spring water, chilled.', price: '5.00' },
    ],
  },
];

// --- Menu Item Card Component ---
const MenuItemCard: React.FC<{ item: IMenuItem, primaryColor: string, handleOrder: (item: IMenuItem) => void }> = ({ item, primaryColor, handleOrder }) => (
  <div className="py-4 border-b border-neutral-800 transition-all hover:bg-neutral-900 px-2 -mx-2 rounded-lg flex justify-between items-center">
    <div className="flex-grow">
        <div className="flex justify-between items-start">
            <h4 className="text-xl font-bold text-gray-50">{item.name}</h4>
            <span className={`text-xl font-extrabold ${primaryColor} ml-4 whitespace-nowrap hidden sm:inline`}>
                ${item.price}
            </span>
        </div>
        <div className="flex items-center space-x-3 mt-1">
            <p className="text-gray-400 text-sm italic">{item.description}</p>
            {item.tags && (
                <div className="hidden md:flex space-x-1">
                    {item.tags.map(tag => (
                        <span key={tag} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${primaryColor} border border-amber-800/50`}>
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </div>
    <div className="flex items-center sm:items-start flex-shrink-0 ml-4">
        <span className={`text-lg font-extrabold ${primaryColor} mr-4 sm:hidden`}>
            ${item.price}
        </span>
        <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleOrder(item)} 
            className={`bg-amber-500 hover:bg-amber-600 text-black ml-4 flex-shrink-0 transition-all`}
        >
            <Plus className='w-4 h-4 mr-1'/> Add to Cart
        </Button>
    </div>
  </div>
);





// --- Main Menu Page Component (Simplified) ---
const MenuPage: React.FC = () => {
  const primaryColor = 'text-amber-500'; 
  const bgColor = 'bg-black text-white';

  
  // Handler now only logs the selected item
  const handleAddToCart = useCallback((item: IMenuItem) => {
    console.log(`Item Added to Cart (Simulated): ID ${item.id} - ${item.name} (${item.price})`);
    // NOTE: Using console.log and alert() since we removed state management
    alert(`Added "${item.name}" to the simulated cart! Check console for details.`);
  }, []);


  return (
    <div className={`py-20 md:py-32 ${bgColor} font-inter min-h-screen`}>
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"> 
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className={`text-sm tracking-widest uppercase ${primaryColor}`}>Discover Our Cuisine</p>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mt-2">
            The Bistro Lumière Menu
          </h2>
          <p className="mt-4 text-gray-400 max-w-3xl mx-auto text-lg">
            View our full menu by category and click Add to Cart to log your selection.
          </p>
        </div>

        {/* Main Content: Menu (Full Width) */}
        <div className="w-full">
            <Tabs defaultValue={mockMenuData[0].category} className="w-full">
                {/* Tabs List */}
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto bg-neutral-900 p-2 rounded-xl border border-neutral-800 mb-12">
                    {mockMenuData.map((category) => (
                        <TabsTrigger
                            key={category.category}
                            value={category.category}
                            className={`py-3 text-base font-semibold data-[state=active]:bg-amber-500 data-[state=active]:text-black data-[state=active]:shadow-lg ${primaryColor}/70 data-[state=active]:font-extrabold transition-all`}
                        >
                            {category.title}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {/* Menu Tab Content */}
                {mockMenuData.map((category) => (
                    <TabsContent 
                        key={category.category}
                        value={category.category}
                        className="mt-12"
                    >
                        <div className="flex items-center mb-8 border-b border-amber-500/50 pb-4">
                            {category.category.includes('beverages') 
                            ? <GlassWater className={`w-8 h-8 mr-3 ${primaryColor}`} /> 
                            : <Utensils className={`w-8 h-8 mr-3 ${primaryColor}`} />}

                            <h3 className="text-4xl font-extrabold text-white">
                                {category.title}
                            </h3>
                        </div>

                        {/* Menu Item List */}
                        {/* <div className="grid grid-cols-1 gap-x-10 gap-y-1">
                            {category.items.map((item) => (
                                <MenuItemCard 
                                    key={item.id} 
                                    item={item} 
                                    primaryColor={primaryColor} 
                                    handleOrder={handleAddToCart} 
                                />
                            ))}
                        </div> */}
                    </TabsContent>
                ))}
            </Tabs>
        </div>


        {/* Footer/Note Section */}
        <div className="mt-20 pt-8 border-t border-neutral-800 text-center">
          <p className="text-sm text-gray-500">
            * This is a simulated ordering system.Add to Cart logs the item to the console.
          </p>
        </div>

      </div>
    </div>
  );
};

export default MenuPage;