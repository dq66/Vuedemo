<template>
  <div class="but-top">
    <div>
      <el-row style="margin-bottom: 40px">
        <el-button type="danger" icon="el-icon-delete" circle @click="delall"></el-button>
        <el-button type="primary" icon="el-icon-plus" circle @click="add = true"></el-button>
        <el-button type="warning" icon="el-icon-refresh" circle @click="refresh"></el-button>
        <form action="" class="for-tab">
          <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
          <Input suffix="ios-search" placeholder="请输入内容" style="width: auto" />
        </form>
      </el-row>
    </div>
    <Divider orientation="left" style="font-size:18px;color:#999;">类型列表</Divider>
    <el-table :data="tableData" style="width: 100%" @selection-change="selsChange">
      <el-table-column type="selection" width="55">
    </el-table-column>
      <el-table-column prop="date" label="日期" width="200">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="200">
      </el-table-column>
      <el-table-column prop="describe" label="描述">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
    <template>
      <el-dialog title="添加" :visible.sync="add">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域:" :label-width="formLabelWidth" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="add = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </div>
      </el-dialog>
    </template>
    <template>
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="姓名:" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域:" :label-width="formLabelWidth" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit2222('form')">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </div>
</template>
<style>
.but-top{
  padding: 10px;
}
.for-tab{
  width: 170px;
  margin-left: 160px;
  margin-top: -35px;
}
.el-dialog__header {
    text-align: left;
    border-bottom: 1px solid #eee;
    background-color: #F8F8F8;
  }
  .bott{
    background-color: #ffffff;
    text-align: left;
    padding: 10px 10px;
  }
</style>

  <script>
  export default {
      data() {
        return {
          sels: [],//选中的值显示
          dialogFormVisible: false,
          add: false,
          form: {
          name: '',
          desc: ''
        },
        formLabelWidth: '120px',
        rules: {
          name: [{
              required: true,
              message: '请输入姓名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 5,
              message: '长度在 3 到 5 个字符',
              trigger: 'blur'
            }
          ],
          desc: [{
            required: true,
            message: '请填写地址',
            trigger: 'blur'
          }]
        },
          tableData: [{
            id: '1',
            date: '2016-05-02',
            name: 'php',
            describe: ''
          }, {
            id: '2',
            date: '2016-05-04',
            name: 'mysql',
            describe: ''
          }, {
            id: '3',
            date: '2016-05-01',
            name: 'html',
            describe: ''
          }, {
            id: '4',
            date: '2016-05-03',
            name: '杂七杂八',
            describe: ''
          }]
        }
      },
      methods: {
        handleClick(row) {
         // console.log(row);
         // 2. 动态改变路由的指向
         this.$router.push({path: `type/xq`});
        },
        selsChange(sels) {//将选中的值赋值给sels
            this.sels = sels;
        },
        delall(){//批量删除
          if(this.sels.length === 0){
            this.$message({
              message: '请先选择你要删除的！',
              type: 'warning'
            });
          }else{
            var ids = this.sels.map(item => item.id).join()//获取所有选中行的id组成的字符串，以逗号分隔
            //console.log(ids);
            this.$confirm('你确定要删除id为 '+ids+' 吗？')
            .then(_ => {
                this.$message({
                  message: '批量删除成功！',
                  type : 'success'
                });
                done();
              })
            .catch(_ => {});
          }
        },
        refresh(){//刷新
          this.$router.push({
            path:'type',
            query: {
              t: +new Date()
            }
        });
        },
        onSubmit(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$message({
                message:'提交成功',
                type: 'success'
              });
              this.form.name="";
              this.form.desc="";
              this.add = false; //关闭窗口
            } else {
             // console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
  </script>
