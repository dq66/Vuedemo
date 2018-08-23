<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

  .ivu-layout-sider {
    height: 900px;
  }

  .demo-ruleForm {
    margin: 5% 5%;
  }

  .layout-header-bar {
    height: 50px !important;
    line-height: 50px;
  }

  .layout-header-bar>i {
    line-height: 50px;
  }

  .rig span {
    border-left: 1px solid#d7dde4;
    padding: 20px;
    font-size: 14px;
  }
</style>

<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu :active-name="active" theme="dark" width="auto" :class="menuitemClasses"
        accordion :open-names="[menuData[0].name]" @on-select="menuSelect">
          <Submenu v-for="(item,index) in menuData" :key="index" :name="item.name">
            <template slot="title">
              <Icon :type="item.icon"></Icon>
              <span>{{item.label}}</span>
            </template>
            <menu-item v-for="(mi,index) in item.menuitems" :key="index" :name="mi.name" :to="mi.url">{{mi.label}}</menu-item>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0, border: '1px solid #d7dde4'}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px',float: 'left'}" type="md-menu" size="24"></Icon>
          <div class="rig" :style="{float: 'right'}">
            <span><Icon type="ios-mail-outline" :size="25" /></span>
            <span><a>主题</a></span>
            <span><a>个人信息</a></span>
          </div>
        </Header>
        <Breadcrumb :style="{margin: '0px 0', background: '#fff', height: '32px'}">
          <Tabs type="card" @on-tab-remove="removeTab" @on-click="clickTab" :animated="false" :value="active">
            <template v-for="(item,index) in mainTabs">
              <tab-pane :key="item.name" :label="item.label" :name="item.name" v-if="item.name == 'home'"></tab-pane>
              <tab-pane :key="item.name" :label="item.label" closable :name="item.name" v-else></tab-pane>
            </template>
          </Tabs>
        </Breadcrumb>
        <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active:"",
        isCollapsed: false,
        menuData: [{
          label: '菜单管理',
          icon: 'ios-keypad-outline',
          name: "m1",
          menuitems: [{
              name: 'm1-1',
              label: '菜单1-1',
              url: 'type'
            },
            {
              name: 'm1-2',
              label: '菜单1-2',
              url: 'user'
            },
            {
              name: 'm1-3',
              label: '菜单1-3',
              url: 'cs'
            },
            {
              name: 'm1-4',
              label: '菜单1-4',
              url: 'aa'
            },
          ]
        }, {
          label: '菜单2',
          icon: 'ios-search',
          name: "m2",
          menuitems: [{
              name: 'm2-1',
              label: '菜单2-1',
              url: 'm2-1.html'
            },
            {
              name: 'm2-2',
              label: '菜单2-2',
              url: 'm2-1.html'
            },
            {
              name: 'm2-3',
              label: '菜单2-3',
              url: 'm2-1.html'
            },
            {
              name: 'm2-4',
              label: '菜单2-4',
              url: 'm2-1.html'
            },
          ]
        }, {
          label: '菜单3',
          icon: 'ios-settings',
          name: "m3",
          menuitems: [{
              name: 'm3-1',
              label: '菜单3-1',
              url: 'm3-1.html'
            },
            {
              name: 'm3-2',
              label: '菜单3-2',
              url: 'm3-1.html'
            },
            {
              name: 'm3-3',
              label: '菜单3-3',
              url: 'm3-1.html'
            },
            {
              name: 'm3-4',
              label: '菜单3-4',
              url: 'm3-1.html'
            },
          ]
        }],
        mainHeight: 0,
        frameHeight: 0,
        mainTabs: [
          {
            label: '首页',
            name: 'home',
            show: true,
            url : 'home'
          }
        ],
      }
    },
    computed: {
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      menuitemClasses() {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    methods: {
      //菜单展开或关闭
      collapsedSider() {
        this.$refs.side1.toggleCollapse();
      },
      // tab切换时，动态的切换路由
      clickTab: function(name) {
        this.active = name;
        for (var i = 0; i < this.mainTabs.length; i++) {
          if (this.mainTabs[i].name == name) {
            this.$router.push({
              path: this.mainTabs[i].url
            });
          }
        }
      },
      //根据名称来查找对应的菜单条目
      getMenuItem: function(name) {
        for (var sm = 0; sm < this.menuData.length; sm++) {
          for (var mi = 0; mi < this.menuData[sm].menuitems.length; mi++) {
            if (this.menuData[sm].menuitems[mi].name == name) return this.menuData[sm].menuitems[mi];
          }
        }
        return {}; //这个应该不可能发生
      },
      //根据名称查找对应的Tab页。
      getTab: function(name) {
        for (var i = 0; i < this.mainTabs.length; i++) {
          if (this.mainTabs[i].name == name) return this.mainTabs[i];
        }
        return null; //没有找到
      },
      //设置Tab页不可见。
      removeTab: function(name) {
        //console.log(this.active);
        this.mainTabs.splice(this.mainTabs.findIndex(item => item.name === name), 1)
        this.active=this.mainTabs[this.mainTabs.length-1].name;
        //console.log(this.active);
        this.$router.push({
          path:this.mainTabs[this.mainTabs.length-1].url
        });
      },
      //菜单点击
      menuSelect: function(name) {
        var tab = this.getTab(name);
        if (tab == null) {
          var mi = this.getMenuItem(name);
          var mi = $.extend({}, mi, {
            show: true
          });
          this.mainTabs.push(mi);
        } else {
          tab.show = true;
        }
        this.active = name;
      },
    }
  }
</script>
