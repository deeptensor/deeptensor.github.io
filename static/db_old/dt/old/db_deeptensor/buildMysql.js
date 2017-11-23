console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
console.log('--------------------------------------------')
console.log('----------- DIKOBRAZ : DEEPTENSOR ----------')
console.log('-------  Conversion excel -> mysql  --------')
console.log('--------------------------------------------')

//throw 'Dangerous!!'

const path = require("path")
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@@', path.join(path.resolve(__dirname), './../../src'))
const hook = require('@@/es6export/es6export')

const Cs = require('@@/cs/Cs.js')
const {tblsDel$, tblExcelToMySQL$, tblMySQLToJSON$} = require('@@/database/engine/Converter')

const CS = new Cs({app: 'deeptensor', debug: true, write: true})
CS.res('Modules are loaded')

const efolder = '/Users/andrei/Yandex.Disk.localized/programming/web/sites/deeptensor_source/_db'
const efile = 'db_deeptensor.xlsx'
//const tblNames = ['plan', 'events', 'journals', 'papers', 'team', 'imgs']
const tblNames = ['papers', 'journals']
const opts = {
    userName: 'root',
    userPassword: 'fraksos',
    dbName: 'deeptensor',
    dbPath: path.join(efolder, efile)
}
Promise.resolve()
    .then  (res => tblsDel$(opts,tblNames, 'mySQL'))
    .then  (res => CS.res(`Old mySQL tables are deleted`))
    /*
    .then  (res => tblExcelToMySQL$(opts, 'imgs', [
        {name: 'name',
            type: 'VARCHAR',
            sub1: 50,
            isPk: true,
            isNotNull: true
        },
        {name: 'width',
            type: 'SMALLINT',
            isNotNull: true
        },
        {name: 'height',
            type: 'SMALLINT',
            isNotNull: true
        },
        {name: 'path',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'path_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'href',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'href_rus',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'caption',
            type: 'VARCHAR',
            sub1: 150
        },
        {name: 'caption_rus',
            type: 'VARCHAR',
            sub1: 150
        },
        {name: 'position_x',
            type: 'SMALLINT'
        },
        {name: 'position_y',
            type: 'SMALLINT'
        },
        {name: 'bg_size',
            type: 'VARCHAR',
            sub1: 20
        },
        {name: 'repeat_x',
            type: 'BOOLEAN',
            deft: false,
            isNotNull: true
        },
        {name: 'repeat_y',
            type: 'BOOLEAN',
            deft: false,
            isNotNull: true
        }
    ]))
    .then  (res => tblExcelToMySQL$(opts, 'team', [
        {name: 'id',
            type: 'VARCHAR',
            sub1: 20,
            isPk: true,
            isNotNull: true
        },
        {name: 'active',
            type: 'BOOLEAN',
            deft: false,
            isNotNull: true
        },
        {name: 'page_caption',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_caption_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_keywords',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_keywords_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_description',
            type: 'VARCHAR',
            sub1: 150
        },
        {name: 'page_description_rus',
            type: 'VARCHAR',
            sub1: 150
        },
        {name: 'page_name',
            type: 'VARCHAR',
            sub1: 50
        },
        {name: 'name',
            type: 'VARCHAR',
            sub1: 30,
            isNotNull: true
        },
        {name: 'surname',
            type: 'VARCHAR',
            sub1: 30,
            isNotNull: true
        },
        {name: 'middle',
            type: 'VARCHAR',
            sub1: 30
        },
        {name: 'name_rus',
            type: 'VARCHAR',
            sub1: 30,
            isNotNull: true
        },
        {name: 'surname_rus',
            type: 'VARCHAR',
            sub1: 30,
            isNotNull: true
        },
        {name: 'middle_rus',
            type: 'VARCHAR',
            sub1: 30
        },
        {name: 'year_born',
            type: 'YEAR'
        },
        {name: 'degree',
            type: 'ENUM',
            enum: ['Doctor', 'Ph.D.', 'Ph.D. student', 'Graduate student', 'Student']
        },
        {name: 'degree_rus',
            type: 'ENUM',
            enum: ['Доктор ф.-м. наук', 'Кандидат ф.-м. наук', 'Аспирант', 'Магистр', 'Студент']
        },
        {name: 'institution',
            type: 'VARCHAR',
            sub1: 100,
            deft: 'Skolkovo Institute of Science and Technology'
        },
        {name: 'institution_rus',
            type: 'VARCHAR',
            sub1: 100,
            deft: 'Сколковский институт науки и технологий'
        },
        {name: 'position',
            type: 'ENUM',
            enum: ['Professor', 'Associate Professor', 'Research Professor', 'Research Scientist', 'Research Intern', 'Grant Manager', 'Manager']
        },
        {name: 'position_rus',
            type: 'ENUM',
            enum: ['Профессор', 'Профессор-исследователь', 'Доцент', 'Научный сотрудник', 'Младший научный сотрудник', 'Менеджер грантов', 'Менеджер']
        },
        {name: 'position_lab',
            type: 'ENUM',
            enum: ['Head of the Laboratory']
        },
        {name: 'position_lab_rus',
            type: 'ENUM',
            enum: ['Заведующий Лабораторий']
        },
        {name: 'role',
            type: 'ENUM',
            enum: ['head', 'deputy', 'researcher', 'phdstudent', 'student', 'manager']
        },
        {name: 'interests',
            type: 'MEDIUMTEXT'
        },
        {name: 'interests_rus',
            type: 'MEDIUMTEXT'
        },
        {name: 'general_info',
            type: 'MEDIUMTEXT'
        },
        {name: 'general_info_rus',
            type: 'MEDIUMTEXT'
        },
        {name: 'tasks',
            type: 'MEDIUMTEXT'
        },
        {name: 'tasks_rus',
            type: 'MEDIUMTEXT'
        },
        {name: 'home_page',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'mail',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'image',
            type: 'VARCHAR',
            sub1: 50,
            fkName: 'image_name',
            fkCol: 'name',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        {name: 'image_thumb',
            type: 'VARCHAR',
            sub1: 50,
            fkName: 'image_name_thumb',
            fkCol: 'name',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        {name: 'supervisor',
            type: 'VARCHAR',
            sub1: 20,
            fkCol: 'id',
            fkName: 'supervisor',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    ]))
    */
    .then  (res => tblExcelToMySQL$(opts, 'journals', [
        {name: 'name',
            type: 'VARCHAR',
            sub1: 200,
            isPk: true,
            isNotNull: true
        },
        {name: 'site',
            type: 'VARCHAR',
            sub1: 300
        },
        {name: 'wos',
            type: 'VARCHAR',
            sub1: 500
        },
        {name: 'scopus',
            type: 'VARCHAR',
            sub1: 500
        },
        {name: 'if',
            type: 'DECIMAL',
            sub1: 5,
            sub2: 3,
        },
        {name: 'if_wo_sjsc',
            type: 'DECIMAL',
            sub1: 5,
            sub2: 3,
        },
        {name: 'if5',
            type: 'DECIMAL',
            sub1: 5,
            sub2: 3,
        },
        {name: 'publisher',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'issn',
            type: 'VARCHAR',
            sub1: 10,
        },
        {name: 'country',
            type: 'VARCHAR',
            sub1: 20
        },
        {name: 'quartile',
            type: 'ENUM',
            enum: ['1', '2', '3', '4']
        },
        {name: 'check_date',
            type: 'DATE'
        }
    ]))
    .then  (res => tblExcelToMySQL$(opts, 'papers', [
        {name: 'tag',
            type: 'VARCHAR',
            sub1: 100,
            isPk: true,
            isNotNull: true
        },
        {name: 'title',
            type: 'VARCHAR',
            sub1: 200,
            isNotNull: true
        },
        {name: 'year',
            type: 'YEAR',
            isNotNull: true
        },
        {name: 'authors_detected',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'wos',
            type: 'VARCHAR',
            sub1: 500
        },
        {name: 'scopus',
            type: 'VARCHAR',
            sub1: 500
        },
        {name: 'support',
            type: 'VARCHAR',
            sub1: 100,
        },
        {name: 'affiliation',
            type: 'VARCHAR',
            sub1: 100,
        },
        {name: 'kind',
            type: 'ENUM',
            enum: ['book', 'article', 'conference', 'techreport', 'patent'],
            deft: 'article'
        },
        {name: 'author',
            type: 'VARCHAR',
            sub1: 300
        },
        {name: 'publisher',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'journal',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'volume',
            type: 'SMALLINT'
        },
        {name: 'number',
            type: 'SMALLINT'
        },
        {name: 'pages',
            type: 'VARCHAR',
            sub1: 20,
        },
        {name: 'doi',
            type: 'VARCHAR',
            sub1: 100,
        },
        {name: 'url',
            type: 'VARCHAR',
            sub1: 300,
        },
        {name: 'notes',
            type: 'VARCHAR',
            sub1: 1000
        },
        {name: 'check_date',
            type: 'DATE'
        }
    ]))
    /*
    .then  (res => tblExcelToMySQL$(opts, 'plan', [
        {name: 'name',
            type: 'VARCHAR',
            sub1: 20,
            isPk: true,
            isNotNull: true
        },
        {name: 'year',
            type: 'YEAR',
            isNotNull: true
        },
        {name: 'num',
            type: 'TINYINT',
            isNotNull: true
        },
        {name: 'funding',
            type: 'ENUM',
            enum: ['Minestry', 'Skoltech']
        },
        {name: 'executive_in_charge',
            type: 'VARCHAR',
            sub1: 100,
        },
        {name: 'content',
            type: 'MEDIUMTEXT'
        },
        {name: 'content_rus',
            type: 'MEDIUMTEXT'
        },
        {name: 'expected_results',
            type: 'MEDIUMTEXT'
        },
        {name: 'expected_results_rus',
            type: 'MEDIUMTEXT'
        },
        {name: 'is_scientific',
            type: 'BOOLEAN',
            deft: true,
            isNotNull: true
        },
        {name: 'is_done',
            type: 'BOOLEAN',
            deft: false,
            isNotNull: true
        }
    ]))
    .then  (res => tblExcelToMySQL$(opts, 'events', [
        {name: 'id',
            type: 'VARCHAR',
            sub1: 20,
            isPk: true,
            isNotNull: true
        },
        {name: 'show_in_list',
            type: 'BOOLEAN',
            deft: false,
            isNotNull: true
        },
        {name: 'active',
            type: 'BOOLEAN',
            deft: true,
            isNotNull: true
        },
        {name: 'page_caption',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_caption_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_keywords',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_keywords_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'page_description',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'page_description_rus',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'page_name',
            type: 'VARCHAR',
            sub1: 50
        },
        {name: 'day',
            type: 'TINYINT'
        },
        {name: 'month',
            type: 'TINYINT'
        },
        {name: 'year',
            type: 'YEAR'
        },
        {name: 'description',
            type: 'MEDIUMTEXT'
        },
        {name: 'description_rus',
            type: 'MEDIUMTEXT'
        },
        {name: 'description_sub',
            type: 'MEDIUMTEXT'
        },
        {name: 'description_sub_rus',
            type: 'MEDIUMTEXT'
        },
        {name: 'image1',
            type: 'VARCHAR',
            sub1: 50,
            fkName: 'image1',
            fkCol: 'name',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        {name: 'image1_rus',
            type: 'VARCHAR',
            sub1: 50,
            fkName: 'image1_rus',
            fkCol: 'name',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        {name: 'image2',
            type: 'VARCHAR',
            sub1: 50,
            fkName: 'image2',
            fkCol: 'name',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        {name: 'image2_rus',
            type: 'VARCHAR',
            sub1: 50,
            fkName: 'image2_rus',
            fkCol: 'name',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        {name: 'link1',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'link1_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'link1_text',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'link1_text_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'link2',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'link2_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'link2_text',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'link2_text_rus',
            type: 'VARCHAR',
            sub1: 100
        },
        {name: 'title',
            type: 'VARCHAR',
            sub1: 1000
        },
        {name: 'title_rus',
            type: 'VARCHAR',
            sub1: 1000
        },
        {name: 'title_short',
            type: 'VARCHAR',
            sub1: 200
        },
        {name: 'title_short_rus',
            type: 'VARCHAR',
            sub1: 200
        }
    ]))
    */
    .then  (res => CS.res(`Tables are converted to mySQL`))
    .catch (err => CS.err(`Can't convert tables to mySQL`, '', '', err))
    .then  (res => process.exit())
