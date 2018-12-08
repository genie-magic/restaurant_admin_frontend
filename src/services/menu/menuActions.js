import { createActions } from 'redux-actions';

const {
  getMenus,
  getMenusSucceed,
  getMenusFailed,
  deleteMenu,
  deleteMenuSucceed,
  deleteMenuFailed,
  updateMenu,
  updateMenuSucceed,
  updateMenuFailed,
  addMenu,
  addMenuSucceed,
  addMenuFailed,
  getMenu,
  getMenuSucceed,
  getMenuFailed,
  updateCurrentMenu
} = createActions({
  GET_MENUS:() => ({}),
  GET_MENUS_SUCCEED: (menus) => ({ menus }),
  GET_MENUS_FAILED: (error) => ({ error }),
  DELETE_MENU: (id) => ({ id }),
  DELETE_MENU_SUCCEED: () => ({}),
  DELETE_MENU_FAILED: (error) => ({ error }),
  UPDATE_MENU: (id, menu) => ({ id, menu }),
  UPDATE_MENU_SUCCEED:() => ({}),
  UPDATE_MENU_FAILED: (error) => ({ error }),
  ADD_MENU: (menu) => ({ menu }),
  ADD_MENU_SUCCEED: () => ({}),
  ADD_MENU_FAILED: (error) => ({ error }),
  GET_MENU: (id) => ({ id }),
  GET_MENU_SUCCEED: (menu) => ({ menu }),
  GET_MENU_FAILED: (error) => ({ error }),
  UPDATE_CURRENT_MENU: (menu) => ({ menu })
});

export {
  getMenus,
  getMenusSucceed,
  getMenusFailed,
  deleteMenu,
  deleteMenuSucceed,
  deleteMenuFailed,
  updateMenu,
  updateMenuSucceed,
  updateMenuFailed,
  addMenu,
  addMenuSucceed,
  addMenuFailed,
  getMenu,
  getMenuSucceed,
  getMenuFailed,
  updateCurrentMenu
}