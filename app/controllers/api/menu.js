/* eslint-disable complexity */
const { lowerCase } = require('lodash');

const db = require ('../../config/db');
const Menu = require('../../models/menu');
const Metadata = require('../../models/metadata');

const index = async (req, res) => {
  const data = await db("menus")
                      .select("name");
  return res.status(200).send({data:data});
}

const searchByTerm = async (req, res) => {
  let { term } = req.query;
  term = lowerCase(term);
  console.log(term)
  const data = await db("menus")
                      .select("name")
                      .whereRaw(`LOWER(name) LIKE ?`, [`%${term}%`])
                      
                     
  return res.status(200).send({data:data});

};

const getMenuItemImages = async (req, res) => {

  
  const {id} = req.params;
  /**
   * Data Object needs to refactor in advance stage to increase the app perfoermance using join
   * 
   */
  /* const data = await db("menu_images")
                      .join("menu_vedios", "menu_vedios.menu_id", "menu_images.menu_id")
                      .select("image_url", "vedio_url")
                      .where({"menu_images.menu_id": id}); */
  
  const menu = await db("menus").leftJoin("metadata", "menus.id", "metadata.menu_id").select("name", "ingrediants", "alias_name").where({"menus.id": id}).limit(1);
  const menuImages = await db("menu_images").select("image_url").where({"menu_id": id});
  const menuVedios = await db("menu_vedios").select("vedio_url").where({"menu_id": id});

  /**
   * Menu Object needs to refactor in advance stage
   */
  const menuData = {
    ...menu.map(item=>item)[0],
    menu_images: menuImages.map(item=>item.image_url),
    menu_vedios:menuVedios.map(item=>item.vedio_url)
  }
  return res.status(200).send({data:menuData}); 

}



const saveMenu = async (req, res) => {
  const { name } = req.body;
  try {
    await Menu.upsert(name);
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(422).send({ success: false, error: { message: 'Something went wrong' } });
  }
};

const saveMenuMetadata = async (req, res) => {
  const {id} = req.params;
  const { alias_name,  ingrediants } = req.body;
  const metadata = {menu_id: id, alias_name:alias_name, ingrediants:ingrediants};

  try {
    await Metadata.upsert(metadata);
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(422).send({ success: false, error: { message: 'Something went wrong' } });
  }
};

module.exports = {
  index,
  searchByTerm,
  saveMenu,
  getMenuItemImages,
  saveMenuMetadata
};
