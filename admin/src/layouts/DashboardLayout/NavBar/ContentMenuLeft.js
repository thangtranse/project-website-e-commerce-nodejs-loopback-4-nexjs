import {
  BarChart as BarChartIcon,







  Chrome, FileMinus, Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon
} from 'react-feather';

export const ROOT_PATH = ""

export default () => {
  return [
    {
      href: ROOT_PATH + '/dashboard',
      icon: BarChartIcon,
      title: 'Dashboard'
    },
    {
      href: ROOT_PATH + '/products',
      icon: ShoppingBagIcon,
      title: 'Products'
    },
    {
      href: ROOT_PATH + '/news',
      icon: FileMinus,
      title: 'News'
    },
    {
      href: ROOT_PATH + '/categories',
      icon: FileMinus,
      title: 'Category'
    },
    {
      href: ROOT_PATH + '/customers',
      icon: UserIcon,
      title: 'Users'
    },
    {
      href: ROOT_PATH + '/website',
      icon: Chrome,
      title: 'Website Infor'
    },
    {
      href: ROOT_PATH + '/settings',
      icon: SettingsIcon,
      title: 'Settings'
    }
  ];
}

// export default () => {
//   return [
//     {
//       href: ROOT_PATH + '/dashboard',
//       icon: BarChartIcon,
//       title: 'Dashboard'
//     },
//     {
//       href: ROOT_PATH + '/pages',
//       icon: ShoppingBagIcon,
//       title: 'Pages'
//     },
//     {
//       href: ROOT_PATH + '/products',
//       icon: ShoppingBagIcon,
//       title: 'Products'
//     },
//     {
//       href: ROOT_PATH + '/news',
//       icon: FileMinus,
//       title: 'News'
//     },
//     {
//       href: ROOT_PATH + '/categories',
//       icon: FileMinus,
//       title: 'Category'
//     },
//     {
//       href: ROOT_PATH + '/crm',
//       icon: UserIcon,
//       title: 'CRM'
//     },
//     {
//       href: ROOT_PATH + '/menu',
//       icon: UserIcon,
//       title: 'Menu'
//     },
//     {
//       href: ROOT_PATH + '/customers',
//       icon: UserIcon,
//       title: 'Users'
//     },
//     {
//       href: ROOT_PATH + '/website',
//       icon: Chrome,
//       title: 'Website Infor'
//     },
//     {
//       href: ROOT_PATH + '/settings',
//       icon: SettingsIcon,
//       title: 'Settings'
//     }
//   ];
// }