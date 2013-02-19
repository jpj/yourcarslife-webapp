/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.solairis.yourcarslife.controller;

import com.solairis.yourcarslife.command.TagFormData;
import com.solairis.yourcarslife.data.domain.Tag;
import com.solairis.yourcarslife.data.domain.User;
import com.solairis.yourcarslife.service.TagService;
import com.solairis.yourcarslife.service.UserService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 *
 * @author Joshua Johnson
 */
@Controller
public class UserTagController {

	@Autowired
	private TagService tagService;
	@Autowired
	private UserService userService;

	@RequestMapping(value={"/user/tag/list"}, method= RequestMethod.GET)
	@Transactional
	public String list(Model model) {
		this.referenceData(null, model);
		return "user-tag";
	}

	@RequestMapping(value={"/user/tag/{tagId}"}, method= RequestMethod.GET)
	@Transactional
	public String form(@PathVariable("tagId") long tagId, @ModelAttribute TagFormData formData, Model model) {
		if (tagId != 0) {
			Tag tag = tagService.getTag(tagId);
			formData.setLabel(tag.getLabel());
		}
		this.referenceData(tagId, model);
		return "user-tag";
	}

	@RequestMapping(value={"/user/tag/{tagId}"}, method= RequestMethod.POST)
	@Transactional
	public String save(@PathVariable("tagId") long tagId, @Valid TagFormData formData, BindingResult errors, Model model) {
		if (!errors.hasErrors()) {
			Tag tag;
			if (tagId != 0) {
				tag = tagService.getTag(tagId);
			} else {
				tag = new Tag();
				tag.setUser(userService.getUser(((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()));
			}
			tag.setLabel(formData.getLabel());
			tagService.save(tag);
			model.addAttribute("saved", true);
		}
		this.referenceData(tagId, model);
		return formData.getSubmit() == TagFormData.Submit.Cancel || !errors.hasErrors() ? "redirect:/user/tag/0" : "user-tag";
	}

	private void referenceData(Long tagId, Model model) {
		User user = this.userService.getUser(((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername());
		model.addAttribute("tagId", tagId);
		model.addAttribute("userTags", tagService.getTagsForUser( user.getUserId() ));
	}

}
