<template>
  <div class="dashboard-container" id="food-app">
    <div class="container">
      <div class="tableBar">
        <el-input
            v-model="input"
            placeholder="请输入菜品名称"
            style="width: 250px"
            clearable
            @keyup.enter.native="handleQuery"
        >
          <i
              slot="prefix"
              class="el-input__icon el-icon-search"
              style="cursor: pointer"
              @click="init"
          ></i>
        </el-input>
        <div class="tableLab">
          <span class="span-btn delBut non" @click="deleteHandle('批量', null)">批量删除</span>
          <span class="span-btn blueBug non" @click="statusHandle('1')">批量启售</span>
          <span style="border:none;" class="span-btn delBut non" @click="statusHandle('0')">批量停售</span>
          <el-button
              type="primary"
              @click="addFoodtype('add')"
          >
            + 新建菜品
          </el-button>
        </div>
      </div>
      <el-table
          :data="tableData"
          stripe
          class="tableBox"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            type="selection"
            width="50"
        ></el-table-column>
        <el-table-column
            prop="name"
            label="菜品名称"
        ></el-table-column>
        <el-table-column prop="image" label="图片" align="center">
          <template slot-scope="{ row }">
            <el-image style="width: auto; height: 40px; border:none;cursor: pointer;"
                      :src="getImage(row.image)"
                      :preview-src-list="[ `${apiUrl}/common/download?name=${row.image}` ]">
              <div slot="error" class="image-slot">
                <img src="@/images/noImg.png" style="width: auto; height: 40px; border:none;">
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
            prop="categoryName"
            label="菜品分类"
        ></el-table-column>
        <el-table-column label="售价">
          <template slot-scope="scope">
            <span style="margin-right: 10px;">￥{{ scope.row.price / 100 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="售卖状态">
          <template slot-scope="scope">
            <span style="margin-right: 10px;">{{ scope.row.status == '0' ? '停售' : '启售' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="最后操作时间"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            width="160"
            align="center"
        >
          <template slot-scope="scope">
            <el-button
                type="text"
                size="small"
                class="blueBug"
                @click="addFoodtype(scope.row.id)"
            >
              修改
            </el-button>
            <el-button
                type="text"
                size="small"
                class="blueBug"
                @click="statusHandle(scope.row)"
            >
              {{ scope.row.status == '0' ? '启售' : '停售' }}
            </el-button>
            <el-button
                type="text"
                size="small"
                class="delBut non"
                @click="deleteHandle('单删', scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          class="pageList"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="counts"
          @size-change="handleSizeChange"
          :current-page.sync="page"
          @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

