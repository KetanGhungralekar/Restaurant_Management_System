package com.Ketan.Service;

import java.util.List;

import com.Ketan.Request.CreateCategoryreq;
import com.Ketan.model.Category;

public interface CategoryService {
    public Category createCategory(CreateCategoryreq categoryname,Long Userid) throws Exception;
    public List<Category> findByRestaurantId(Long Id);
    // public Category updateCategory(Long categoryid,String categoryname) throws Exception;
    // public void deleteCategory(Long categoryid) throws Exception;
    public Category getCategory(Long categoryid) throws Exception;
}
